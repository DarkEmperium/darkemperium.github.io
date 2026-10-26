// Binary rain behind the home hero (blue, paused when off screen)
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");
const hero = canvas.parentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const binary = "01";
const fontSize = 16;
let drops = [];
let running = true;
let lastFrame = 0;

function resizeCanvas() {
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
  const columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }, () => Math.floor((Math.random() * canvas.height) / fontSize));
}

function drawMatrix() {
  ctx.fillStyle = "rgba(5, 10, 24, 0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = binary.charAt(Math.floor(Math.random() * binary.length));
    ctx.fillStyle = Math.random() > 0.96 ? "#a5f3fc" : "#3b82f6";
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

function loop(time) {
  if (!running) return;
  if (time - lastFrame > 45) {
    drawMatrix();
    lastFrame = time;
  }
  requestAnimationFrame(loop);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

if (reduceMotion) {
  for (let i = 0; i < 60; i++) drawMatrix(); // a still frame instead of motion
} else {
  new IntersectionObserver(([entry]) => {
    const wasRunning = running;
    running = entry.isIntersecting;
    if (running && !wasRunning) requestAnimationFrame(loop);
  }).observe(hero);
  requestAnimationFrame(loop);
}

/*-- Slideshow cards : frames crossfade in sequence; each image is loaded just before it is shown --*/
function cardSlideshow(host, slides, { interval = 4800, start = 0 } = {}) {
  const card = host.closest(".tile");
  const label = card && card.querySelector("[data-slide-label]");
  const frames = [new Image(), new Image()].map((img) => { img.alt = ""; img.decoding = "async"; host.append(img); return img; });
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = start % slides.length;
  let front = 0;
  let timer = 0;
  let visible = true;

  function load(slide) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img.src);
      img.onerror = () => {
        if (slide.fallback && img.src !== new URL(slide.fallback, location.href).href) img.src = slide.fallback;
        else resolve(null);
      };
      img.src = slide.src;
    });
  }

  async function show(i) {
    const slide = slides[i];
    const src = await load(slide);
    if (!src) return;
    const next = frames[1 - front];
    next.src = src;
    await next.decode().catch(() => {});
    next.classList.add("is-on");
    frames[front].classList.remove("is-on");
    front = 1 - front;
    if (label) {
      label.classList.add("is-swapping");
      setTimeout(() => { label.textContent = slide.label; label.classList.remove("is-swapping"); }, 380);
    }
    // warm up the one after so the next swap is instant
    load(slides[(i + 1) % slides.length]);
  }

  function tick() {
    clearTimeout(timer);
    if (still || slides.length < 2) return;
    timer = setTimeout(async () => {
      if (visible && !document.hidden) {
        index = (index + 1) % slides.length;
        await show(index);
      }
      tick();
    }, interval);
  }

  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(host);
  show(index).then(tick);
}

document.querySelectorAll(".tile-slides[data-slides]").forEach((host) => {
  cardSlideshow(host, JSON.parse(host.dataset.slides));
});

/*-- Watch list card : everything being watched right now (same feed as the anime page), from a random start --*/
(() => {
  const host = document.querySelector(".tile-slides[data-watching]");
  if (!host) return;
  const WATCHING = 1;
  fetch(`https://api.darkemperium.workers.dev/anime?status=${WATCHING}`)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error("feed unavailable"))))
    .then((list) => {
      const slides = (Array.isArray(list) ? list : [])
        .filter((a) => a.status === WATCHING && a.anime_image_path)
        .map((a) => {
          // the feed gives a small thumbnail; ask MyAnimeList for the large cover ("l") so it stays sharp on the card
          const base = a.anime_image_path.replace(/\/r\/\d+x\d+\//, "/");
          return { src: base.replace(/\.(jpe?g|png|webp)(\?|$)/i, "l.$1$2"), fallback: base, label: a.anime_title_eng || a.anime_title };
        });
      if (slides.length) cardSlideshow(host, slides, { interval: 5600, start: Math.floor(Math.random() * slides.length) });
    })
    .catch(() => { /* keep the plain card and its "Live from MyAnimeList" caption */ });
})();
