// Night Walk : runs the rainy street corner (javascript/night-walk-game.js) on this page, behind a GPU notice.
// The scene script is only downloaded and started when the visitor launches it, and stopping it frees the GPU.
(() => {
  const stage = document.getElementById("walk-stage");
  const startButton = document.getElementById("walk-start");
  const prompt = document.getElementById("walk-prompt");
  const toast = document.getElementById("walk-toast");
  const viewButton = document.getElementById("walk-view");
  const soundButton = document.getElementById("walk-sound");
  const fullscreenButton = document.getElementById("walk-fullscreen");
  const stopButton = document.getElementById("walk-stop");
  const loadingText = document.getElementById("walk-loading-text");
  const modal = document.getElementById("gpu-modal");
  const skipBox = document.getElementById("gpu-skip");
  const continueButton = document.getElementById("gpu-continue");
  const cancelButton = document.getElementById("gpu-cancel");
  const wallet = document.getElementById("walk-wallet");
  const cashOut = document.getElementById("walk-cash");
  const cartOut = document.getElementById("walk-cart");
  const bagOut = document.getElementById("walk-bagcount");
  const bagPanel = document.getElementById("walk-bag");
  const bagCart = document.getElementById("walk-bag-cart");
  const bagPaid = document.getElementById("walk-bag-paid");

  const GAME_SRC = "javascript/night-walk-game.js?v=202610261400";
  const SKIP_KEY = "nightWalkGpuNoticeSeen";
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  let running = false;
  let fpv = true;
  let locked = false;
  let action = "";
  let loadTimer = 0;
  let canvas = null;
  let host = null;
  let game = null;
  let scriptLoad = null;
  if (isTouch) stage.classList.add("is-touch");

  /*-- Storage (optional, may be blocked) --*/
  function readSkip() {
    try { return localStorage.getItem(SKIP_KEY) === "1"; } catch (e) { return false; }
  }
  function writeSkip(on) {
    try { on ? localStorage.setItem(SKIP_KEY, "1") : localStorage.removeItem(SKIP_KEY); } catch (e) { /* ignore */ }
  }

  /*-- GPU Notice --*/
  let lastFocus = null;
  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.documentElement.style.overflow = "hidden";
    continueButton.focus();
  }
  function closeModal() {
    modal.classList.remove("is-open");
    document.documentElement.style.overflow = "";
    setTimeout(() => { if (!modal.classList.contains("is-open")) modal.hidden = true; }, 250);
    lastFocus?.focus?.();
  }
  continueButton.addEventListener("click", () => {
    writeSkip(skipBox.checked);
    closeModal();
    launch();
  });
  cancelButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.preventDefault(); closeModal(); }
    if (e.key === "Tab") {
      // keep focus inside the dialog
      const items = [...modal.querySelectorAll("button, input")];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  startButton.addEventListener("click", () => {
    if (readSkip()) launch();
    else openModal();
  });

  /*-- Scene Lifecycle --*/
  function send(data) {
    if (running && game) game(data);
  }

  function loadScript() {
    scriptLoad ??= new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = GAME_SRC;
      s.onload = resolve;
      s.onerror = () => { scriptLoad = null; reject(new Error("The scene could not be downloaded.")); };
      document.body.append(s);
    });
    return scriptLoad;
  }

  function launch() {
    if (running) return;
    running = true;
    fpv = true;
    loadingText.textContent = "Building the street";
    stage.classList.remove("is-failed");
    stage.classList.add("is-active", "is-loading");
    canvas = document.createElement("canvas");
    canvas.className = "walk-canvas";
    canvas.tabIndex = 0;
    canvas.setAttribute("aria-label", "Night Walk, a first-person rainy street corner");
    stage.prepend(canvas);
    // the scene reports in once it has built; fall back if it never does
    clearTimeout(loadTimer);
    loadTimer = setTimeout(() => stage.classList.remove("is-loading"), 25000);
    setSound(true);
    loadScript()
      // building the scene blocks the main thread for a moment, so let the loading screen paint first
      .then(() => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 40))))
      .then(boot, (err) => fail(err.message));
  }

  function boot() {
    if (!running) return;
    const cleanup = [];
    host = {
      canvas,
      dead: false,
      track: (fn) => cleanup.push(fn),
      keys: () => running && (document.pointerLockElement === canvas || stage.contains(document.activeElement)),
      emit: onScene,
      ready: (fn) => { game = fn; },
      fail,
      cleanup,
    };
    try {
      window.nightWalkBoot(host);
      canvas.focus({ preventScroll: true });
      syncPause();
    } catch (err) {
      fail(err.message);
    }
  }

  function fail(message) {
    if (!running || stage.classList.contains("is-failed")) return;
    clearTimeout(loadTimer);
    stage.classList.add("is-loading", "is-failed");
    loadingText.textContent = message;
  }

  function stop() {
    if (!running) return;
    running = false;
    locked = false;
    clearTimeout(loadTimer);
    if (document.fullscreenElement) document.exitFullscreen();
    if (document.pointerLockElement) document.exitPointerLock();
    if (host) {
      host.dead = true;
      for (const fn of host.cleanup) { try { fn(); } catch (e) { /* already gone */ } }
    }
    host = null;
    game = null;
    canvas?.remove();
    canvas = null;
    stage.classList.remove("is-active", "is-loading", "is-failed", "is-fpv", "is-locked");
    if (soundOn) setSound(false);
    action = "";
    toggleBag(false);
    prompt.classList.remove("show");
    startButton.focus();
  }
  stopButton.addEventListener("click", stop);

  // messages from the scene: view mode, interaction prompt, toasts, wallet
  function onScene(d) {
    if (!running) return;
    if ("fpv" in d) {
      if (stage.classList.contains("is-loading")) {
        stage.classList.remove("is-loading");
        clearTimeout(loadTimer);
        send({ sound: soundOn });
        showToast(isTouch ? "Drag on the left to walk, on the right to look" : "WASD to walk, E to interact, V for the overview");
      } else if (fpv !== d.fpv) {
        showToast(d.fpv ? "Walking. Press V for the overview" : "Overview. Drag to orbit, press V to walk");
      }
      fpv = d.fpv;
      locked = d.locked;
    }
    if ("prompt" in d) action = d.prompt;
    if (d.toast) showToast(d.toast);
    if (d.shop) renderShop(d.shop);
    if (d.inv) toggleBag();
    updateHud();
  }

  /*-- Wallet + Bag --*/
  const yen = (n) => "¥" + n.toLocaleString("en-US");
  function fillList(list, items) {
    list.replaceChildren();
    if (!items.length) {
      const li = document.createElement("li");
      li.className = "empty";
      li.textContent = "Nothing yet";
      list.append(li);
      return;
    }
    for (const [name, price] of items) {
      const li = document.createElement("li");
      const label = document.createElement("span");
      const cost = document.createElement("b");
      label.textContent = name;
      cost.textContent = yen(price);
      li.append(label, cost);
      list.append(li);
    }
  }
  function renderShop(shop) {
    const changed = cashOut.textContent !== yen(shop.wallet) || cartOut.textContent !== String(shop.cart.length);
    cashOut.textContent = yen(shop.wallet);
    cartOut.textContent = shop.cart.length;
    bagOut.textContent = shop.bag.length;
    fillList(bagCart, shop.cart);
    fillList(bagPaid, shop.bag);
    if (changed) {
      wallet.classList.remove("bump");
      void wallet.offsetWidth;
      wallet.classList.add("bump");
    }
  }
  function toggleBag(force) {
    const open = force ?? bagPanel.hidden;
    bagPanel.hidden = !open;
    wallet.setAttribute("aria-expanded", String(open));
  }
  wallet.addEventListener("click", () => {
    toggleBag();
    canvas?.focus({ preventScroll: true });
  });

  // on touch the prompt itself is the interact button
  prompt.addEventListener("click", () => {
    if (action) send({ interact: 1 });
  });

  function updateHud() {
    stage.classList.toggle("is-fpv", fpv);
    stage.classList.toggle("is-locked", locked);
    if (running && fpv && action) {
      const key = document.createElement("kbd");
      key.textContent = isTouch ? "Tap" : "E";
      prompt.replaceChildren(key, document.createTextNode(action));
      prompt.classList.add("show");
    } else if (running && fpv && !locked && !isTouch) {
      prompt.textContent = "Click the scene to look around";
      prompt.classList.add("show");
    } else {
      prompt.classList.remove("show");
    }
    viewButton.setAttribute("aria-pressed", String(!fpv));
    viewButton.setAttribute("aria-label", fpv ? "Switch to overview" : "Switch to walking");
    viewButton.title = fpv ? "Overview (V)" : "Walk (V)";
    viewButton.querySelector("i").className = fpv ? "bx bx-world" : "bx bx-walk";
    if (!fpv) toggleBag(false);
  }

  viewButton.addEventListener("click", () => {
    send({ fpv: !fpv });
    canvas?.focus({ preventScroll: true });
  });

  let toastTimer = 0;
  function showToast(text) {
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  // stop rendering while the scene is scrolled away or the tab is hidden
  let inView = true;
  function syncPause() { send({ pause: !inView || document.hidden }); }
  new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; syncPause(); }).observe(stage);
  document.addEventListener("visibilitychange", syncPause);

  /*-- Rain Ambience (generated, no audio files) --*/
  let audioCtx = null;
  let rainGain = null;
  let soundOn = false;
  function ensureAudio() {
    if (audioCtx) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    audioCtx = new Ctx();
    const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.04 * white) / 1.04; // soft brown-ish noise
      data[i] = last * 3.2 + white * 0.08;
    }
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const filter = audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2200;
    rainGain = audioCtx.createGain();
    rainGain.gain.value = 0;
    source.connect(filter).connect(rainGain).connect(audioCtx.destination);
    source.start();
  }

  // one switch for the rain here and the scene's own effects (door chime, footsteps, register)
  function setSound(on) {
    soundOn = on;
    send({ sound: on });
    ensureAudio();
    if (!audioCtx) return;
    audioCtx.resume();
    rainGain.gain.linearRampToValueAtTime(on ? 0.5 : 0, audioCtx.currentTime + 0.6);
    soundButton.setAttribute("aria-pressed", String(on));
    soundButton.querySelector("i").className = on ? "bx bx-volume-full" : "bx bx-volume-mute";
  }
  soundButton.addEventListener("click", () => setSound(!soundOn));

  /*-- Fullscreen --*/
  fullscreenButton.addEventListener("click", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else stage.requestFullscreen?.();
    canvas?.focus({ preventScroll: true });
  });
  document.addEventListener("fullscreenchange", () => {
    fullscreenButton.querySelector("i").className = document.fullscreenElement ? "bx bx-exit-fullscreen" : "bx bx-fullscreen";
  });

  stage.classList.add("is-ready");
})();
