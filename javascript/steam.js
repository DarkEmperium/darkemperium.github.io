// Steam section : profile, rarest achievements, library and per-game trailer + achievements,
// read from the site API worker (workers/api, /steam/* routes). Everything is built with textContent, never innerHTML.
(() => {
  const section = document.getElementById("steam");
  if (!section) return;

  // on localhost (or a file opened straight from disk) the worker can be swapped for a local one:
  // gaming.html?steamapi=http://localhost:8787
  const local = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  const override = local && new URLSearchParams(location.search).get("steamapi");
  const API = (override || section.dataset.steamApi || "").replace(/\/+$/, "");
  const HLS_SRC = "https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.17/hls.min.js";
  const LIBRARY_PREVIEW = 12;

  const $ = (sel, root = section) => root.querySelector(sel);
  const status = $("[data-steam-status]");
  const modal = document.querySelector("[data-steam-modal]");

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  async function get(path) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const r = await fetch(`${API}/steam${path}`, { signal: controller.signal });
      if (!r.ok) throw new Error(`Steam service answered ${r.status}`);
      return await r.json();
    } finally {
      clearTimeout(timer);
    }
  }

  const header = (appid) => `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appid}/header.jpg`;
  const hours = (minutes) => (!minutes ? null : minutes < 60 ? `${minutes} min` : `${Math.round(minutes / 60).toLocaleString("en-US")} h`);
  const since = (ms) => new Date(ms).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  function ago(ms) {
    if (!ms) return null;
    const days = Math.floor((Date.now() - ms) / 86400000);
    if (days < 1) return "Played today";
    if (days < 30) return `Played ${days} day${days > 1 ? "s" : ""} ago`;
    if (days < 365) return `Played ${Math.floor(days / 30)} month${days >= 60 ? "s" : ""} ago`;
    return `Played ${Math.floor(days / 365)} year${days >= 730 ? "s" : ""} ago`;
  }
  // medal tiers by how few players own the achievement
  function tier(percent) {
    if (percent == null) return { cls: "is-steel", label: "Earned" };
    if (percent < 10) return { cls: "is-gold", label: "Ultra rare" };
    if (percent < 20) return { cls: "is-silver", label: "Rare" };
    if (percent < 40) return { cls: "is-bronze", label: "Uncommon" };
    return { cls: "is-steel", label: "Common" };
  }

  /*-- Profile --*/
  function renderProfile(p, lib, awards) {
    const box = $("[data-steam-profile]");
    box.removeAttribute("aria-busy");
    if (p) {
      const avatar = $(".steam-avatar", box);
      avatar.src = p.avatar;
      avatar.hidden = false;
      $("[data-steam-name]", box).textContent = p.name || "Dark Emperium";
      if (p.memberSince) $("[data-steam-since]", box).textContent = `Member since ${since(p.memberSince)}`;
    }
    const stats = {
      level: p && p.level != null ? p.level : null,
      games: lib ? lib.count : null,
      hours: lib && lib.totalMinutes != null ? Math.round(lib.totalMinutes / 60).toLocaleString("en-US") : null,
      achievements: awards ? awards.unlocked.toLocaleString("en-US") : null,
    };
    Object.entries(stats).forEach(([key, value]) => {
      const dd = $(`[data-stat="${key}"]`, box);
      if (value == null) dd.parentElement.hidden = true;
      else dd.textContent = value;
    });
  }

  /*-- Medals : the rarest achievements --*/
  function renderMedals(awards) {
    const row = $("[data-steam-medals]");
    row.replaceChildren();
    const list = (awards && awards.rarest) || [];
    if (!list.length) {
      row.closest(".steam-block").hidden = true;
      return;
    }
    list.forEach((a) => {
      const t = tier(a.percent);
      const medal = el("article", `medal ${t.cls}`);
      medal.title = a.desc || a.name;
      const badge = el("div", "medal-badge");
      const img = el("img");
      img.src = a.icon;
      img.alt = "";
      img.loading = "lazy";
      badge.append(img);
      medal.append(el("span", "medal-ribbon"), badge, el("span", "medal-tier", t.label), el("h4", null, a.name), el("p", "medal-game", a.game));
      if (a.percent != null) medal.append(el("p", "medal-rarity", `${a.percent}% of players`));
      row.append(medal);
    });
  }

  /*-- Library --*/
  // genre ids come from the worker (store tags); apps are anything Steam does not sell as a game
  const FILTERS = [
    ["all", "All"],
    ["shooter", "Shooter"],
    ["rpg", "RPG"],
    ["horror", "Horror"],
    ["survival", "Survival"],
    ["sports", "Racing & Sports"],
    ["party", "Party"],
    ["story", "Story & Puzzle"],
    ["sim", "Sim & Strategy"],
    ["app", "Apps"],
  ];
  const groupsOf = (g) => (g.type === "app" ? ["app"] : g.genres || []);

  function renderLibrary(lib, awards) {
    const grid = $("[data-steam-library]");
    grid.replaceChildren();
    const progress = new Map(((awards && awards.games) || []).map((g) => [g.appid, g]));
    let extras = [];
    try { extras = JSON.parse(grid.dataset.extraGames || "[]").map((x) => ({ ...x, offSteam: true })); } catch (e) { extras = []; }
    const games = [...extras, ...((lib && lib.games) || [])];
    const cards = games.map((g) => {
      const card = el("button", `steam-card card${g.offSteam ? " is-off-steam" : ""}`);
      card.type = "button";
      if (g.appid) card.dataset.appid = g.appid;
      card.groups = groupsOf(g);
      const media = el("div", "steam-card-media");
      const img = el("img");
      img.src = g.image || header(g.appid);
      img.alt = "";
      img.loading = "lazy";
      img.addEventListener("error", () => media.classList.add("is-missing"), { once: true });
      const playIcon = el("span", "steam-card-play");
      playIcon.append(el("i", "bx bx-play"));
      media.append(img, playIcon);
      if (g.offSteam) media.append(el("span", "steam-card-tag", g.platform));
      const body = el("div", "steam-card-body");
      body.append(el("h4", null, g.name));
      const meta = g.offSteam ? `Played on ${g.platform}` : g.minutes === 0 ? "Not played yet" : [hours(g.minutes), ago(g.lastPlayed)].filter(Boolean).join(" · ");
      if (meta) body.append(el("p", "steam-card-meta", meta));
      const p = g.offSteam ? null : progress.get(g.appid);
      if (p && p.total) {
        const bar = el("div", "steam-bar");
        const fill = el("i");
        fill.style.width = `${Math.round((p.unlocked / p.total) * 100)}%`;
        bar.append(fill);
        body.append(bar, el("p", "steam-card-ach", `${p.unlocked} / ${p.total} achievements`));
      }
      card.append(media, body);
      card.addEventListener("click", () => openGame(g, p));
      grid.append(card);
      return card;
    });

    // filtering : a genre shows its first LIBRARY_PREVIEW titles until "Show all" is pressed
    const bar = $("[data-steam-filters]");
    const count = $("[data-steam-count]");
    const more = $("[data-steam-more]");
    const empty = el("p", "steam-empty", "Nothing in this genre yet.");
    let active = "all";
    let expanded = false;

    function apply(animate) {
      const matches = cards.filter((c) => active === "all" || c.groups.includes(active));
      const shown = expanded ? matches : matches.slice(0, LIBRARY_PREVIEW);
      const visible = new Set(shown);
      cards.forEach((c) => (c.hidden = !visible.has(c)));
      if (matches.length) empty.remove();
      else grid.append(empty);
      const rest = matches.length - shown.length;
      more.hidden = rest <= 0;
      more.textContent = `Show all ${matches.length} ${matches.length === 1 ? "title" : "titles"}`;
      count.textContent = `Showing ${shown.length} of ${matches.length} ${matches.length === 1 ? "title" : "titles"}`;
      if (animate && window.UI) UI.animateIn(shown);
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }

    bar.replaceChildren();
    FILTERS.forEach(([id, label]) => {
      const n = id === "all" ? cards.length : cards.filter((c) => c.groups.includes(id)).length;
      if (!n) return;
      const button = el("button", `filter${id === active ? " is-active" : ""}`, label);
      button.type = "button";
      button.dataset.filter = id;
      button.setAttribute("aria-pressed", String(id === active));
      button.append(el("span", "count", String(n)));
      button.addEventListener("click", () => {
        if (id === active) return;
        active = id;
        expanded = false;
        bar.querySelectorAll(".filter").forEach((b) => {
          const on = b === button;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", String(on));
        });
        apply(true);
      });
      bar.append(button);
    });
    bar.hidden = cards.length === 0;
    more.onclick = () => {
      expanded = true;
      apply(false);
    };
    apply(false);
  }

  /*-- Game detail : trailer + every achievement --*/
  let hls = null;
  let hlsLoad = null;
  function loadHls() {
    hlsLoad ??= new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = HLS_SRC;
      s.onload = () => resolve(window.Hls);
      s.onerror = () => { hlsLoad = null; reject(new Error("player unavailable")); };
      document.head.append(s);
    });
    return hlsLoad;
  }

  function stopVideo() {
    const video = $("video", modal);
    video.pause();
    if (hls) { hls.destroy(); hls = null; }
    video.removeAttribute("src");
    video.load();
  }

  function trailerFailed() {
    const video = $("video", modal);
    const button = $("[data-steam-play]", modal);
    if (!video.paused && !video.error) return; // it is playing after all
    button.hidden = false;
    button.lastChild.textContent = "Trailer unavailable";
    button.disabled = true;
  }

  async function playTrailer(trailer) {
    const video = $("video", modal);
    const button = $("[data-steam-play]", modal);
    button.hidden = true;
    try {
      if (trailer.mp4) {
        video.src = trailer.mp4;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = trailer.hls; // Safari (and some Chromium builds) play HLS natively
      } else {
        const Hls = await loadHls();
        if (!Hls || !Hls.isSupported()) throw new Error("unsupported");
        hls = new Hls({ capLevelToPlayerSize: true });
        // wait for the playlist before play(), and only a fatal stream error counts as a failure
        await new Promise((resolve, reject) => {
          hls.on(Hls.Events.MANIFEST_PARSED, resolve);
          hls.on(Hls.Events.ERROR, (event, data) => {
            if (!data.fatal) return;
            reject(new Error(data.details));
            trailerFailed();
          });
          hls.loadSource(trailer.hls);
          hls.attachMedia(video);
        });
      }
      await video.play();
    } catch (e) {
      // play() is rejected when a newer load interrupts it (AbortError) even though the trailer then plays
      if (e && e.name === "AbortError") return;
      if (e && e.name === "NotAllowedError") {
        button.hidden = false;
        button.disabled = false;
        button.lastChild.textContent = "Play trailer";
        return;
      }
      trailerFailed();
    }
  }

  function setLink(link, href, icon, label) {
    link.href = href;
    link.replaceChildren(el("i", `bx ${icon}`), document.createTextNode(` ${label}`));
  }

  async function openGame(game, progress) {
    $("#steam-modal-title", modal).textContent = game.name;
    const link = $("[data-steam-store]", modal);
    const video = $("video", modal);
    const play = $("[data-steam-play]", modal);
    const ring = $("[data-steam-ach-progress]", modal);
    const grid = $("[data-steam-ach-grid]", modal);
    grid.replaceChildren();

    if (game.offSteam) {
      $("[data-steam-modal-meta]", modal).textContent = `Played on ${game.platform}`;
      setLink(link, game.link, "bx-globe", "Official site");
      video.poster = game.image;
      play.hidden = false;
      play.disabled = false;
      play.lastChild.textContent = "Play trailer";
      play.onclick = () => playTrailer({ mp4: game.trailer });
      ring.textContent = `${game.name} is played on ${game.platform}, outside Steam, so there are no Steam achievements to show.`;
      modal.dataset.appid = `off:${game.name}`;
      modal.showModal();
      document.documentElement.style.overflow = "hidden";
      return;
    }

    $("[data-steam-modal-meta]", modal).textContent = game.minutes === 0 ? "Not played yet" : [hours(game.minutes) && `${hours(game.minutes)} played`, ago(game.lastPlayed)].filter(Boolean).join(" · ");
    setLink(link, `https://store.steampowered.com/app/${game.appid}/`, "bxl-steam", "Store page");
    video.poster = game.image || header(game.appid);
    play.hidden = false;
    play.disabled = true;
    play.lastChild.textContent = "Loading trailer";
    ring.textContent = "Loading achievements";
    modal.showModal();
    document.documentElement.style.overflow = "hidden";

    const appid = game.appid;
    modal.dataset.appid = String(appid); // later answers for another game are ignored
    get(`/trailer?appid=${appid}`)
      .then((t) => {
        if (modal.dataset.appid !== String(appid)) return;
        if (!t.hls && !t.mp4) throw new Error("none");
        if (t.thumbnail) video.poster = t.thumbnail;
        play.disabled = false;
        play.lastChild.textContent = "Play trailer";
        play.onclick = () => playTrailer(t);
      })
      .catch(() => {
        play.lastChild.textContent = "No trailer available";
      });

    try {
      const a = await get(`/achievements?appid=${appid}`);
      if (modal.dataset.appid !== String(appid)) return;
      if (!a.total) {
        ring.textContent = "This game has no Steam achievements.";
        return;
      }
      const pct = Math.round((a.unlocked / a.total) * 100);
      ring.replaceChildren();
      const bar = el("div", "steam-bar is-large");
      const fill = el("i");
      fill.style.width = `${pct}%`;
      bar.append(fill);
      ring.append(el("p", "ach-count", `${a.unlocked} of ${a.total} achievements unlocked · ${pct}%`), bar);
      a.items.forEach((item) => {
        const cell = el("div", `ach ${item.unlocked ? "is-earned" : "is-locked"}`);
        const img = el("img");
        img.src = item.icon;
        img.alt = "";
        img.loading = "lazy";
        const when = item.unlocked && item.time ? ` · unlocked ${new Date(item.time).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : "";
        const rarity = item.percent != null ? ` · ${item.percent}% of players` : "";
        cell.title = `${item.name}${item.desc ? ` : ${item.desc}` : ""}${rarity}${when}`;
        cell.append(img, el("span", "ach-name", item.name));
        grid.append(cell);
      });
    } catch (e) {
      ring.textContent = "Achievements could not be loaded right now.";
    }
  }

  function closeModal() {
    stopVideo();
    if (modal.open) modal.close();
  }
  // dialog scrollbar : a slim thumb inset from the rounded corners, shown while scrolling or hovering, draggable
  function customScroll(panel) {
    const INSET = 14;
    const thumb = el("span", "steam-scroll");
    thumb.setAttribute("aria-hidden", "true");
    thumb.hidden = true;
    modal.append(thumb);
    let fade = 0;
    let drag = null;

    function sync() {
      const { scrollTop, scrollHeight, clientHeight } = panel;
      const range = scrollHeight - clientHeight;
      thumb.hidden = range < 2;
      if (thumb.hidden) return;
      const track = clientHeight - INSET * 2;
      const size = Math.max(36, (track * clientHeight) / scrollHeight);
      thumb.style.height = `${size}px`;
      thumb.style.transform = `translateY(${INSET + ((track - size) * scrollTop) / range}px)`;
    }
    function wake() {
      thumb.classList.add("is-active");
      clearTimeout(fade);
      fade = setTimeout(() => { if (!drag) thumb.classList.remove("is-active"); }, 900);
    }

    panel.addEventListener("scroll", () => { sync(); wake(); }, { passive: true });
    new ResizeObserver(sync).observe(panel);
    [...panel.children].forEach((child) => new ResizeObserver(sync).observe(child));
    modal.addEventListener("pointerenter", sync);

    thumb.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      thumb.setPointerCapture(e.pointerId);
      drag = { y: e.clientY, top: panel.scrollTop };
      thumb.classList.add("is-dragging", "is-active");
    });
    thumb.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const track = panel.clientHeight - INSET * 2 - thumb.offsetHeight;
      const range = panel.scrollHeight - panel.clientHeight;
      if (track > 0) panel.scrollTop = drag.top + ((e.clientY - drag.y) * range) / track;
    });
    const release = () => {
      if (!drag) return;
      drag = null;
      thumb.classList.remove("is-dragging");
      wake();
    };
    thumb.addEventListener("pointerup", release);
    thumb.addEventListener("pointercancel", release);
    // a drag that ends over the backdrop must not count as a click outside the dialog
    thumb.addEventListener("click", (e) => e.stopPropagation());
    return sync;
  }

  if (modal) {
    const syncScroll = customScroll($(".steam-modal-panel", modal));
    modal.addEventListener("toggle", syncScroll);
    $("[data-steam-close]", modal).addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal && !modal.querySelector(".steam-scroll.is-dragging")) closeModal(); });
    // whatever the play() promise said, a trailer that is actually playing never shows the overlay button
    $("video", modal).addEventListener("playing", () => { $("[data-steam-play]", modal).hidden = true; });
    modal.addEventListener("close", () => {
      stopVideo();
      delete modal.dataset.appid;
      document.documentElement.style.overflow = "";
    });
  }

  /*-- Load --*/
  if (!API) return;
  Promise.allSettled([get("/profile"), get("/library"), get("/awards")]).then(([p, l, a]) => {
    const profile = p.status === "fulfilled" ? p.value : null;
    const lib = l.status === "fulfilled" ? l.value : null;
    const awards = a.status === "fulfilled" ? a.value : null;
    section.classList.remove("is-loading");
    if (!profile && !lib) {
      status.hidden = false;
      status.textContent = "Steam data is unavailable right now. Please check back soon.";
      section.querySelectorAll(".steam-block").forEach((b) => (b.hidden = true));
      // the profile strip settles into a plain link card instead of waiting forever
      const box = $("[data-steam-profile]");
      box.removeAttribute("aria-busy");
      $(".steam-stats", box).hidden = true;
      $("[data-steam-since]", box).textContent = "Find me on Steam";
      return;
    }
    renderProfile(profile, lib, awards);
    renderMedals(awards);
    renderLibrary(lib, awards);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
})();
