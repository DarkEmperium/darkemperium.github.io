/* =====================================================================
   Loader : dots sweep in from left to right, as if writing the word,
   and land on the letters of "Dark Emperium". Each dot fades into its
   landing spot and swells into a disc that reveals the solid wordmark,
   so the discs merge and the complete word is built from the dots.
   A counter runs to 100, then the view dives into the mark and a circle
   opens onto the page. The exit only transforms the finished frame on
   the GPU so it stays smooth at any screen size.
   ===================================================================== */

(function () {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const root = document.documentElement;
  const done = () => {
    if (root.classList.contains("is-loaded")) return;
    root.classList.add("is-loaded");
    window.dispatchEvent(new Event("preloader:done"));
  };
  const remove = () => {
    preloader.style.display = "none";
    document.body.style.overflow = "";
  };

  const canvas = preloader.querySelector(".ld-canvas");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canvas || reduceMotion) {
    const finishPlain = () => { done(); remove(); };
    if (document.readyState === "complete") finishPlain();
    else window.addEventListener("load", finishPlain);
    setTimeout(finishPlain, 4000);
    return;
  }

  document.body.style.overflow = "hidden";
  setTimeout(() => { done(); remove(); }, 9000); // never leave the page covered

  // The wordmark uses the site font, so wait briefly for it before tracing it
  const fontsReady = document.fonts
    ? Promise.race([
        document.fonts.load('800 120px "Cabinet Grotesk"'),
        new Promise((resolve) => setTimeout(resolve, 1200)),
      ])
    : Promise.resolve();
  // if the animation cannot run (e.g. a zero-size window in a background tab), go straight to the page
  const safeStart = () => {
    try { start(); } catch (e) { done(); remove(); }
  };
  fontsReady.then(safeStart, safeStart);

  function start() {
    if (start.ran) return;
    start.ran = true;

    // Later pages in the same visit get a shorter run
    let isReturn = false;
    try {
      isReturn = sessionStorage.getItem("de-loaded") === "1";
      sessionStorage.setItem("de-loaded", "1");
    } catch (e) {}
    const BUILD = isReturn ? 1300 : 2600;

    const ctx = canvas.getContext("2d");
    const numEl = preloader.querySelector(".ld-num");
    const msgEl = preloader.querySelector(".ld-msg");
    const lineEl = preloader.querySelector(".ld-line i");
    const MESSAGES = ["Initialising", "Loading assets", "Preparing the experience", "Ready"];
    const FIELD = "#050a18";

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = preloader.clientWidth || window.innerWidth;
    const height = preloader.clientHeight || window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /*-- Lay out the wordmark : one line on wide screens, stacked on narrow ones --*/
    const FONT = (px) => `800 ${px}px "Cabinet Grotesk", "Segoe UI", system-ui, sans-serif`;
    const stacked = width < 640;
    const probe = document.createElement("canvas").getContext("2d");
    const measure = (text, px) => {
      probe.font = FONT(px);
      return probe.measureText(text).width;
    };
    const targetWidth = Math.min(width * (stacked ? 0.8 : 0.68), 920);
    const unit = stacked ? measure("Emperium", 100) : measure("Dark Emperium", 100);
    const fontPx = Math.min((targetWidth / unit) * 100, height * (stacked ? 0.12 : 0.18));
    const pad = Math.ceil(fontPx * 0.3);
    const lines = stacked ? ["Dark", "Emperium"] : ["Dark Emperium"];
    const lineH = fontPx * 1.05;
    const textW = Math.max(...lines.map((l) => measure(l, fontPx)));
    const markW = Math.ceil(textW) + pad * 2;
    const markH = Math.ceil(lineH * lines.length) + pad * 2;
    if (!(width > 1 && height > 1 && markW > 0 && markH > 0)) throw new Error("no room to draw the loader");

    // One shape mask for sampling dots, one crisp gradient render for the reveal
    const paintText = (c, fill) => {
      c.font = FONT(fontPx);
      c.textBaseline = "middle";
      c.fillStyle = fill;
      lines.forEach((text, i) => {
        const w = measure(text, fontPx);
        c.fillText(text, (markW - w) / 2, pad + lineH * (i + 0.5));
      });
    };

    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = markW;
    maskCanvas.height = markH;
    const mctx = maskCanvas.getContext("2d", { willReadFrequently: true });
    paintText(mctx, "#fff");
    const mask = mctx.getImageData(0, 0, markW, markH).data;

    const solid = document.createElement("canvas");
    solid.width = Math.ceil(markW * dpr);
    solid.height = Math.ceil(markH * dpr);
    const sctx = solid.getContext("2d");
    sctx.scale(dpr, dpr);
    const gradient = sctx.createLinearGradient(pad, 0, pad + textW, 0);
    gradient.addColorStop(0, "#f5f8ff");
    gradient.addColorStop(0.4, "#f5f8ff");
    gradient.addColorStop(0.62, "#93c5fd");
    gradient.addColorStop(1, "#67e0f4");
    // Discs reveal a glow-free copy so letter edges stay crisp while the word forms
    const plain = document.createElement("canvas");
    plain.width = solid.width;
    plain.height = solid.height;
    const pctx = plain.getContext("2d");
    pctx.scale(dpr, dpr);
    paintText(pctx, gradient);

    // The finished wordmark adds its soft glow once every letter is complete
    sctx.shadowColor = "rgba(96, 165, 250, 0.35)";
    sctx.shadowBlur = fontPx * 0.2;
    paintText(sctx, gradient);

    const cx = width / 2;
    const cy = height / 2 - height * 0.05;
    const left = cx - markW / 2;
    const top = cy - markH / 2;
    const diagonal = Math.hypot(width, height);
    const pitch = Math.max(4, fontPx / 13); // dense enough for landed discs to cover each letter

    const focus = { x: cx, y: cy }; // the exit zooms into the centre of the wordmark

    /*-- Dots : sampled inside the letters, arriving in a left-to-right sweep --*/
    const COLORS = ["#e6edff", "#bfdbfe", "#93c5fd", "#67e0f4"];
    const dots = [];
    let row = 0;
    for (let y = 2; y < markH; y += pitch * 0.866, row++) {
      for (let x = 2 + (row % 2 ? pitch / 2 : 0); x < markW; x += pitch) {
        if (mask[(Math.round(y) * markW + Math.round(x)) * 4 + 3] < 128) continue;
        const sweep = x / markW; // 0 at the first letter, 1 at the last
        const angle = Math.PI + (Math.random() - 0.5) * 1.8; // mostly from the left
        dots.push({
          tx: left + x,
          ty: top + y,
          lx: x,
          ly: y,
          sx: cx + Math.cos(angle) * diagonal * (0.45 + Math.random() * 0.3),
          sy: cy + Math.sin(angle) * diagonal * (0.45 + Math.random() * 0.3),
          curve: (Math.random() - 0.5) * 0.7,
          delay: sweep * 0.34 + Math.random() * 0.1,
          r: pitch * (0.24 + Math.random() * 0.08),
          color: COLORS[Math.min(COLORS.length - 1, Math.floor(sweep * COLORS.length))],
        });
      }
    }

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const clamp01 = (t) => Math.min(1, Math.max(0, t));

    // Timing as shares of the build : last dot lands at 0.84, last disc has covered by 0.96
    const FLIGHT = 0.4;
    const SWELL = 0.12;
    const COVER = pitch * 0.9; // generous overlap so no gaps show between discs

    const reveal = document.createElement("canvas");
    reveal.width = solid.width;
    reveal.height = solid.height;
    const rctx = reveal.getContext("2d");
    rctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const draw = (p) => {
      ctx.globalAlpha = 1;
      ctx.fillStyle = FIELD;
      ctx.fillRect(0, 0, width, height);

      // 1. Dots in flight, drawn first so the forming word always sits on top of them
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const t = clamp01((p - d.delay) / FLIGHT);
        if (t <= 0 || t >= 1) continue;
        const e = easeOut(t);
        const mx = (d.sx + d.tx) / 2 - (d.ty - d.sy) * d.curve;
        const my = (d.sy + d.ty) / 2 + (d.tx - d.sx) * d.curve;
        const x = (1 - e) * (1 - e) * d.sx + 2 * (1 - e) * e * mx + e * e * d.tx;
        const y = (1 - e) * (1 - e) * d.sy + 2 * (1 - e) * e * my + e * e * d.ty;
        // fade in on departure and dissolve on arrival so no dot lingers by the word
        ctx.globalAlpha = Math.min(1, t * 4) * (1 - Math.pow(t, 3));
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(x, y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Landed dots swell into discs that reveal the solid wordmark
      rctx.globalCompositeOperation = "source-over";
      rctx.clearRect(0, 0, markW, markH);
      rctx.fillStyle = "#fff";
      let landed = 0;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const since = p - d.delay - FLIGHT * 0.85; // swelling starts just before touchdown
        if (since < 0) continue;
        landed++;
        const grow = easeOut(clamp01(since / SWELL));
        rctx.beginPath();
        rctx.arc(d.lx, d.ly, d.r * 0.6 + (COVER - d.r * 0.6) * grow, 0, Math.PI * 2);
        rctx.fill();
      }
      // 3. The finished glow fades in behind the word; the word itself never cross-fades
      const settle = clamp01((p - 0.88) / 0.12);
      if (settle > 0) {
        ctx.globalAlpha = easeOut(settle);
        ctx.drawImage(solid, left, top, markW, markH);
      }
      if (landed) {
        rctx.globalCompositeOperation = "source-in";
        rctx.drawImage(plain, 0, 0, markW, markH);
        ctx.globalAlpha = 1;
        ctx.drawImage(reveal, left, top, markW, markH);
      }
      // seal any hairline gaps between discs with the identical plain word
      if (settle > 0) {
        ctx.globalAlpha = 1;
        ctx.drawImage(plain, left, top, markW, markH);
      }
      ctx.globalAlpha = 1;
    };

    let messageIndex = -1;
    const setCounter = (value) => {
      const n = Math.round(value);
      numEl.textContent = (n < 10 ? "00" : n < 100 ? "0" : "") + n;
      lineEl.style.transform = `scaleX(${n / 100})`;
      const index = n >= 100 ? 3 : Math.floor((n / 100) * 3);
      if (index !== messageIndex) {
        messageIndex = index;
        msgEl.textContent = MESSAGES[index];
        msgEl.classList.remove("is-in");
        void msgEl.offsetWidth;
        msgEl.classList.add("is-in");
      }
    };

    let pageLoaded = document.readyState === "complete";
    window.addEventListener("load", () => (pageLoaded = true));
    setTimeout(() => (pageLoaded = true), 3500); // slow media never holds visitors for long

    preloader.classList.add("is-canvas");
    preloader.style.setProperty("--hx", `${focus.x}px`);
    preloader.style.setProperty("--hy", `${focus.y}px`);
    const startTime = performance.now();
    let leaving = false;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      done();
      remove();
    };

    /*-- Exit : the wordmark holds still while a circle opens from the centre onto the page --*/
    const leave = () => {
      leaving = true;
      preloader.classList.add("is-leaving");
      const gsap = window.gsap;
      if (gsap) {
        gsap.timeline({ onComplete: finish })
          .call(done, null, 0)
          .fromTo(preloader, { "--hole": "0px" }, { "--hole": `${diagonal * 0.75}px`, duration: 1, ease: "power3.inOut" }, 0);
      } else {
        preloader.style.transition = "opacity 0.6s ease";
        requestAnimationFrame(() => (preloader.style.opacity = "0"));
        done();
        setTimeout(finish, 650);
      }
    };

    const frame = (now) => {
      if (finished || leaving) return;
      const p = clamp01((now - startTime) / BUILD);
      // the counter holds at 99 until the page itself has finished loading
      setCounter(Math.min(pageLoaded ? 100 : 99, easeInOut(p) * 100));
      draw(p);
      if (p >= 1 && pageLoaded) {
        setTimeout(leave, 380);
        return;
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
})();
