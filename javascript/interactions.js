// Shared UI interactions : one motion system built on GSAP + ScrollTrigger
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const root = document.documentElement;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const animate = Boolean(gsap && ScrollTrigger) && !reduceMotion;

  root.classList.add("ui-js");
  if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  // Motion tokens : every animation on the site draws from these
  const EASE = "expo.out";
  const EASE_SOFT = "power3.out";
  const DUR = 1.1;

  /*---------------------------------------------------------------
    Header : solid once scrolled, tucks away on scroll down
  ---------------------------------------------------------------*/
  const header = document.querySelector("[data-header]");
  let lastY = window.scrollY;
  function onScroll() {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 12);
      if (y > lastY + 4 && y > 320 && !root.classList.contains("nav-open")) header.classList.add("is-hidden");
      if (y < lastY - 4 || y < 120) header.classList.remove("is-hidden");
    }
    if (Math.abs(y - lastY) > 4) lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (header) header.addEventListener("focusin", () => header.classList.remove("is-hidden"));

  /*---------------------------------------------------------------
    Mobile Menu
  ---------------------------------------------------------------*/
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navLinks.querySelectorAll("a").forEach((a, i) => a.style.setProperty("--n", i));
    const setOpen = (open) => {
      root.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    navToggle.addEventListener("click", () => setOpen(!root.classList.contains("nav-open")));
    navLinks.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }

  /*---------------------------------------------------------------
    Desktop Nav : highlight pill glides to the hovered link
  ---------------------------------------------------------------*/
  if (navLinks) {
    const indicator = document.createElement("span");
    indicator.className = "nav-indicator";
    navLinks.prepend(indicator);
    const current = navLinks.querySelector('[aria-current="page"]');
    const moveTo = (link, instant) => {
      if (!link) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.opacity = "1";
      if (animate && !instant) {
        gsap.to(indicator, { x: link.offsetLeft, width: link.offsetWidth, duration: 0.5, ease: EASE, overwrite: true });
      } else {
        indicator.style.width = `${link.offsetWidth}px`;
        indicator.style.transform = `translateX(${link.offsetLeft}px)`;
        if (gsap) gsap.set(indicator, { x: link.offsetLeft, width: link.offsetWidth });
      }
    };
    navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("pointerenter", () => moveTo(a)));
    navLinks.addEventListener("pointerleave", () => moveTo(current));
    // Specular highlight glides across the glass with a mouse pointer (not on touch)
    if (finePointer) {
      navLinks.addEventListener("pointermove", (e) => {
        const rect = navLinks.getBoundingClientRect();
        navLinks.style.setProperty("--gx", `${e.clientX - rect.left}px`);
      });
    }
    window.addEventListener("resize", () => moveTo(current, true));
    if (document.fonts) document.fonts.ready.then(() => moveTo(current, true));
    moveTo(current, true);
  }

  /*---------------------------------------------------------------
    Ambient Glow : a soft light pinned to the pointer
  ---------------------------------------------------------------*/
  if (animate && finePointer) {
    const glow = document.createElement("div");
    glow.className = "ui-glow";
    document.body.appendChild(glow);
    const setX = gsap.quickSetter(glow, "x", "px");
    const setY = gsap.quickSetter(glow, "y", "px");
    window.addEventListener("pointermove", (e) => {
      glow.classList.add("is-active");
      setX(e.clientX);
      setY(e.clientY);
    }, { passive: true });
    root.addEventListener("pointerleave", () => glow.classList.remove("is-active"));
  }

  /*---------------------------------------------------------------
    Text Splitting : wraps words so headings can rise line by line
  ---------------------------------------------------------------*/
  function splitWords(el) {
    const words = [];
    const walk = (node, gradient) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(" "));
              return;
            }
            const outer = document.createElement("span");
            outer.className = "split-word";
            const inner = document.createElement("span");
            inner.textContent = part;
            if (gradient) inner.className = "gradient-text";
            outer.appendChild(inner);
            frag.appendChild(outer);
            words.push(inner);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== "BR") {
          const isGradient = child.classList.contains("gradient-text");
          if (isGradient) child.classList.remove("gradient-text");
          walk(child, gradient || isGradient);
        }
      });
    };
    walk(el, false);
    return words;
  }

  /*---------------------------------------------------------------
    Entrance Choreography
  ---------------------------------------------------------------*/
  const introEls = Array.from(document.querySelectorAll("[data-intro]"));

  // Built up front (paused) so no DOM work competes with the loader's exit
  let introTimeline = null;
  if (animate) {
    introTimeline = gsap.timeline({ paused: true, defaults: { ease: EASE, duration: DUR } });
    introEls.forEach((el, i) => {
      const at = i * 0.08;
      if (el.matches("h1")) {
        const words = splitWords(el);
        gsap.set(el, { autoAlpha: 1 });
        introTimeline.fromTo(words, { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.06 }, at);
      } else {
        introTimeline.fromTo(el, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, clearProps: "transform" }, at);
      }
    });
  }

  function playIntro() {
    if (playIntro.done) return;
    playIntro.done = true;
    if (introTimeline) {
      introTimeline.play();
    } else {
      gsap ? gsap.set(introEls, { autoAlpha: 1 }) : introEls.forEach((el) => (el.style.opacity = 1));
    }
  }

  if (document.getElementById("preloader")) {
    // The entrance plays as the loader opens onto the page
    window.addEventListener("preloader:done", playIntro);
    setTimeout(playIntro, 9500); // matches the loader's own safety timeout
  } else if (document.readyState === "complete") {
    playIntro();
  } else {
    window.addEventListener("load", playIntro);
  }

  // Shared reveal used by pages and by content that arrives later (anime list)
  function reveal(elements, { stagger = 0.08, y = 36 } = {}) {
    const items = Array.from(elements);
    if (!items.length) return;
    if (!animate) {
      items.forEach((el) => {
        el.style.opacity = 1;
        el.classList.add("is-visible");
      });
      return;
    }
    gsap.set(items, { autoAlpha: 0, y });
    ScrollTrigger.batch(items, {
      start: "top 92%",
      once: true,
      onEnter: (batch) => {
        batch.forEach((el) => el.classList.add("is-visible"));
        gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: EASE, stagger, overwrite: true, clearProps: "transform" });
      },
    });
  }

  // Re-entrance for filtered grids (gaming and videos)
  function animateIn(elements) {
    const items = Array.from(elements);
    if (!animate) return;
    gsap.fromTo(items, { autoAlpha: 0, y: 24, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: EASE, stagger: 0.05, overwrite: true, clearProps: "transform" });
  }

  if (animate) {
    // Section headings : words rise from a mask
    document.querySelectorAll(".section-head h2, [data-split]").forEach((el) => {
      const words = splitWords(el);
      gsap.from(words, {
        yPercent: 115,
        duration: 1.2,
        ease: EASE,
        stagger: 0.05,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    // Single blocks
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      gsap.from(el, {
        autoAlpha: 0,
        y: 36,
        duration: DUR,
        ease: EASE,
        clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    // Imagery : a clean upward wipe with a gentle settle
    document.querySelectorAll("[data-reveal-media], .place img").forEach((img) => {
      img.removeAttribute("loading");
      gsap.fromTo(img,
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.5,
          ease: EASE,
          clearProps: "transform,clipPath",
          scrollTrigger: { trigger: img.parentElement, start: "top 85%", once: true },
        });
    });

    // Scroll parallax
    document.querySelectorAll("[data-parallax]").forEach((el) => {
      const amount = Number(el.dataset.parallax) * 200;
      gsap.fromTo(el, { y: -amount }, {
        y: amount,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    });
  }

  // Grouped content staggers in as it scrolls into view
  document.querySelectorAll("[data-reveal-group]").forEach((group) => reveal(group.children));

  /*---------------------------------------------------------------
    Count Up Numbers
  ---------------------------------------------------------------*/
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    if (!animate) {
      el.textContent = target;
      return;
    }
    const counter = { value: 0 };
    el.textContent = "0";
    gsap.to(counter, {
      value: target,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => (el.textContent = Math.round(counter.value)),
      scrollTrigger: { trigger: el, start: "top 95%", once: true },
    });
  });

  /*---------------------------------------------------------------
    Text Scramble : labels decode like a terminal readout
  ---------------------------------------------------------------*/
  const glyphs = "01<>/{}[]#$%&*+=";
  function scramble(el) {
    const textNode = Array.from(el.childNodes).reverse().find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
    if (!textNode || el.dataset.scrambling) return;
    const finalText = textNode.textContent;
    const span = document.createElement("span");
    textNode.replaceWith(span);
    el.dataset.scrambling = "true";
    const state = { progress: 0 };
    gsap.to(state, {
      progress: 1,
      duration: 0.9,
      ease: "power2.inOut",
      onUpdate: () => {
        span.innerHTML = finalText
          .split("")
          .map((ch, i) => (ch === " " || i / finalText.length < state.progress
            ? ch
            : `<span class="scramble-char">${glyphs[Math.floor(Math.random() * glyphs.length)]}</span>`))
          .join("");
      },
      onComplete: () => {
        span.replaceWith(document.createTextNode(finalText));
        delete el.dataset.scrambling;
      },
    });
  }

  if (animate) {
    document.querySelectorAll(".section-head .eyebrow, [data-scramble]").forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: "top 90%", once: true, onEnter: () => scramble(el) });
      el.addEventListener("pointerenter", () => scramble(el));
    });
  }

  /*---------------------------------------------------------------
    Pointer Interactions
  ---------------------------------------------------------------*/
  // Spotlight border on cards
  if (finePointer) {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.add("has-spotlight");
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });
  }

  // 3D tilt driven through CSS variables so hover transforms stay intact
  function tilt(el, maxDeg = 8) {
    if (!animate || !finePointer) return;
    el.addEventListener("pointermove", (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.setProperty("--ui-mx", `${px * 100}%`);
      el.style.setProperty("--ui-my", `${py * 100}%`);
      gsap.to(el, { "--ui-rx": `${(0.5 - py) * maxDeg}deg`, "--ui-ry": `${(px - 0.5) * maxDeg}deg`, duration: 0.5, ease: EASE_SOFT, overwrite: "auto" });
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { "--ui-rx": "0deg", "--ui-ry": "0deg", duration: 0.9, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
    });
  }
  document.querySelectorAll("[data-tilt]").forEach((el) => tilt(el, 10));

  // Magnetic primary buttons
  if (animate && finePointer) {
    document.querySelectorAll(".btn-primary, [data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const rect = el.getBoundingClientRect();
        gsap.to(el, {
          "--mag-x": `${(e.clientX - rect.left - rect.width / 2) * 0.18}px`,
          "--mag-y": `${(e.clientY - rect.top - rect.height / 2) * 0.25}px`,
          duration: 0.4,
          ease: EASE_SOFT,
          overwrite: "auto",
        });
      });
      el.addEventListener("pointerleave", () => {
        gsap.to(el, { "--mag-x": "0px", "--mag-y": "0px", duration: 0.8, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
      });
    });
  }

  // Pointer depth : layers inside [data-depth-root] drift with the mouse
  if (animate && finePointer) {
    document.querySelectorAll("[data-depth-root]").forEach((rootEl) => {
      const layers = Array.from(rootEl.querySelectorAll("[data-depth]"));
      rootEl.addEventListener("pointermove", (e) => {
        const rect = rootEl.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        layers.forEach((layer) => {
          const d = Number(layer.dataset.depth);
          gsap.to(layer, { "--dx": `${px * d}px`, "--dy": `${py * d}px`, duration: 0.8, ease: EASE_SOFT, overwrite: "auto" });
        });
      });
      rootEl.addEventListener("pointerleave", () => {
        gsap.to(layers, { "--dx": "0px", "--dy": "0px", duration: 1.2, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
      });
    });
  }

  // Click ripple
  document.addEventListener("pointerdown", (e) => {
    if (reduceMotion) return;
    const btn = e.target.closest(".btn, .ui-ripple");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ink = document.createElement("span");
    ink.className = "ui-ink";
    ink.style.width = ink.style.height = `${size}px`;
    ink.style.left = `${e.clientX - rect.left - size / 2}px`;
    ink.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(ink);
    ink.addEventListener("animationend", () => ink.remove());
  });

  // Footer wordmark spotlight
  const wordmark = document.querySelector(".footer-wordmark");
  if (wordmark && finePointer) {
    wordmark.addEventListener("pointermove", (e) => {
      const rect = wordmark.getBoundingClientRect();
      wordmark.style.setProperty("--wx", `${e.clientX - rect.left}px`);
      wordmark.style.setProperty("--wy", `${e.clientY - rect.top}px`);
      wordmark.classList.add("is-lit");
    });
    wordmark.addEventListener("pointerleave", () => wordmark.classList.remove("is-lit"));
  }

  /*---------------------------------------------------------------
    Toast
  ---------------------------------------------------------------*/
  let toastEl = null;
  let toastTimer = null;
  function toast(message, icon = "bx-check-circle") {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "ui-toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = `<i class='bx ${icon}'></i><span></span>`;
    toastEl.querySelector("span").textContent = message;
    requestAnimationFrame(() => toastEl.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  /*---------------------------------------------------------------
    Back To Top : ring shows scroll progress
  ---------------------------------------------------------------*/
  const toTop = document.createElement("button");
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = `<svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24.5" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"></circle></svg><i class='bx bx-up-arrow-alt'></i>`;
  document.body.appendChild(toTop);
  const toTopRing = toTop.querySelector("circle");
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  const updateToTop = () => {
    const max = root.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    toTop.classList.toggle("is-visible", window.scrollY > 600);
    toTopRing.style.strokeDashoffset = String(100 - ratio * 100);
  };
  window.addEventListener("scroll", updateToTop, { passive: true });
  updateToTop();

  /*---------------------------------------------------------------
    Command Palette : Ctrl/Cmd + K or "/" to jump anywhere
  ---------------------------------------------------------------*/
  const paletteItems = [
    { group: "Pages", label: "Home", icon: "bx-home-alt", href: "index.html" },
    { group: "Pages", label: "About", icon: "bx-user", href: "about.html" },
    { group: "Pages", label: "Gaming", icon: "bx-joystick", href: "gaming.html" },
    { group: "Pages", label: "Anime watch list", icon: "bx-tv", href: "anime.html" },
    { group: "Pages", label: "Favourite videos", icon: "bx-play-circle", href: "favorite youtube video.html" },
    { group: "Pages", label: "Night Walk", icon: "bx-cloud-rain", href: "night-walk.html" },
    { group: "Sections", label: "Education", icon: "bx-book-open", href: "about.html#education", hint: "About" },
    { group: "Sections", label: "Technical skills", icon: "bx-code-block", href: "about.html#skills", hint: "About" },
    { group: "Sections", label: "Contact", icon: "bx-envelope", href: "about.html#contact", hint: "About" },
    { group: "Sections", label: "PC specifications", icon: "bx-chip", href: "gaming.html#setup", hint: "Gaming" },
    { group: "Sections", label: "Game library", icon: "bx-library", href: "gaming.html#games", hint: "Gaming" },
    { group: "Connect", label: "WhatsApp", icon: "bxl-whatsapp", href: "https://wa.me/60125949451", hint: "External" },
    { group: "Connect", label: "Discord", icon: "bxl-discord-alt", href: "https://discord.com/users/508126529847296002/", hint: "External" },
    { group: "Connect", label: "GitHub", icon: "bxl-github", href: "https://github.com/DarkEmperium/", hint: "External" },
    { group: "Connect", label: "Steam", icon: "bxl-steam", href: "https://steamcommunity.com/id/Dark_Emperium/", hint: "External" },
    { group: "Connect", label: "Twitch", icon: "bxl-twitch", href: "https://www.twitch.tv/dark_emperium", hint: "External" },
    { group: "Actions", label: "Copy page link", icon: "bx-link", action: () => navigator.clipboard?.writeText(location.href).then(() => toast("Link copied to clipboard")), hint: "Clipboard" },
    { group: "Actions", label: "Back to top", icon: "bx-up-arrow-alt", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  ];

  const palette = document.createElement("div");
  palette.className = "palette";
  palette.setAttribute("role", "dialog");
  palette.setAttribute("aria-modal", "true");
  palette.setAttribute("aria-label", "Search the site");
  palette.innerHTML = `
    <div class="palette-panel">
      <label class="palette-search"><i class='bx bx-search'></i><input type="text" placeholder="Search pages, sections and links" autocomplete="off" spellcheck="false" aria-controls="palette-list"><kbd>Esc</kbd></label>
      <ul class="palette-list" id="palette-list" role="listbox"></ul>
      <div class="palette-foot"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>Enter</kbd> Open</span><span><kbd>Esc</kbd> Close</span></div>
    </div>`;
  document.body.appendChild(palette);
  const paletteInput = palette.querySelector("input");
  const paletteList = palette.querySelector(".palette-list");
  let paletteMatches = [];
  let paletteIndex = 0;
  let lastFocus = null;

  const escapeHtml = (t) => t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function renderPalette() {
    const q = paletteInput.value.trim().toLowerCase();
    paletteMatches = paletteItems.filter((it) => !q || `${it.label} ${it.hint || ""} ${it.group}`.toLowerCase().includes(q));
    paletteIndex = Math.min(paletteIndex, Math.max(paletteMatches.length - 1, 0));
    if (!paletteMatches.length) {
      paletteList.innerHTML = `<li class="palette-empty">No results for "${escapeHtml(paletteInput.value)}"</li>`;
      return;
    }
    let html = "";
    let group = "";
    paletteMatches.forEach((it, i) => {
      if (it.group !== group) {
        group = it.group;
        html += `<li class="palette-group" role="presentation">${group}</li>`;
      }
      let label = escapeHtml(it.label);
      if (q) {
        const at = it.label.toLowerCase().indexOf(q);
        if (at > -1) label = `${escapeHtml(it.label.slice(0, at))}<mark>${escapeHtml(it.label.slice(at, at + q.length))}</mark>${escapeHtml(it.label.slice(at + q.length))}`;
      }
      html += `<li class="palette-item${i === paletteIndex ? " is-active" : ""}" role="option" aria-selected="${i === paletteIndex}" data-i="${i}"><i class='bx ${it.icon}'></i><span>${label}</span>${it.hint ? `<small>${it.hint}</small>` : ""}</li>`;
    });
    paletteList.innerHTML = html;
    paletteList.querySelector(".is-active")?.scrollIntoView({ block: "nearest" });
  }

  function openPalette() {
    lastFocus = document.activeElement;
    paletteInput.value = "";
    paletteIndex = 0;
    renderPalette();
    palette.classList.add("is-open");
    paletteInput.focus({ preventScroll: true });
    if (animate) {
      gsap.fromTo(palette.querySelector(".palette-panel"), { y: -16, scale: 0.97 }, { y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" });
      gsap.fromTo(paletteList.children, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.015, ease: EASE_SOFT });
    }
  }

  function closePalette() {
    palette.classList.remove("is-open");
    if (lastFocus) lastFocus.focus?.();
  }

  function runItem(item) {
    if (!item) return;
    closePalette();
    if (item.action) item.action();
    else if (/^https?:/.test(item.href)) window.open(item.href, "_blank", "noopener");
    else window.location.href = item.href;
  }

  paletteInput.addEventListener("input", () => {
    paletteIndex = 0;
    renderPalette();
  });
  paletteInput.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const n = paletteMatches.length;
      if (!n) return;
      paletteIndex = (paletteIndex + (e.key === "ArrowDown" ? 1 : -1) + n) % n;
      renderPalette();
    } else if (e.key === "Enter") {
      e.preventDefault();
      runItem(paletteMatches[paletteIndex]);
    }
  });
  paletteList.addEventListener("pointermove", (e) => {
    const li = e.target.closest(".palette-item");
    if (li && Number(li.dataset.i) !== paletteIndex) {
      paletteIndex = Number(li.dataset.i);
      paletteList.querySelectorAll(".palette-item").forEach((el) => el.classList.toggle("is-active", el === li));
    }
  });
  paletteList.addEventListener("click", (e) => {
    const li = e.target.closest(".palette-item");
    if (li) runItem(paletteMatches[Number(li.dataset.i)]);
  });
  palette.addEventListener("click", (e) => {
    if (e.target === palette) closePalette();
  });
  document.querySelectorAll("[data-palette-open]").forEach((btn) => btn.addEventListener("click", openPalette));
  window.addEventListener("keydown", (e) => {
    const typing = /input|textarea|select/i.test(document.activeElement?.tagName || "") || document.activeElement?.isContentEditable;
    if ((e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
      e.preventDefault();
      palette.classList.contains("is-open") ? closePalette() : openPalette();
    } else if (e.key === "Escape" && palette.classList.contains("is-open")) {
      closePalette();
    }
  });
  if (/Mac|iPhone|iPad/.test(navigator.platform)) {
    document.querySelectorAll(".search-trigger kbd").forEach((k) => (k.textContent = "⌘K"));
  }

  // Layout can shift once fonts and late content arrive
  window.addEventListener("load", () => animate && ScrollTrigger.refresh());

  window.UI = { reveal, animateIn, tilt, toast, reduceMotion, animate };
})();
