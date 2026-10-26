// Rotating role line
document.addEventListener("DOMContentLoaded", () => {
  if (window.Typed) {
    new Typed("#auto-type", {
      strings: ["Computer Science Student", "Full Stack Web Developer", "Computer Technician", "Tech Enthusiast", "System Administrator"],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1600,
      loop: true,
    });
  }
});

// Education timeline : the line fills as you scroll through it
const timeline = document.querySelector("[data-timeline]");
if (timeline) {
  const items = Array.from(timeline.querySelectorAll(".timeline-item"));
  const DOT = 20;

  // Each dot sits level with its card title; the line runs from first dot to last dot
  const layoutTimeline = () => {
    const centers = items.map((item) => {
      const title = item.querySelector("h3");
      const center = title.offsetTop + title.offsetHeight / 2 + item.querySelector(".timeline-card").offsetTop;
      item.querySelector(".timeline-dot").style.setProperty("--dot-top", `${center - DOT / 2}px`);
      return item.offsetTop + center;
    });
    timeline.style.setProperty("--line-top", `${centers[0]}px`);
    timeline.style.setProperty("--line-height", `${centers[centers.length - 1] - centers[0]}px`);
  };

  let queued = false;
  const updateTimeline = () => {
    const rect = timeline.getBoundingClientRect();
    const lineTop = rect.top + parseFloat(timeline.style.getPropertyValue("--line-top") || 0);
    const lineHeight = parseFloat(timeline.style.getPropertyValue("--line-height") || 1);
    const progress = (window.innerHeight * 0.6 - lineTop) / lineHeight;
    timeline.style.setProperty("--progress", Math.min(Math.max(progress, 0), 1).toFixed(3));
    queued = false;
  };

  layoutTimeline();
  new ResizeObserver(() => {
    layoutTimeline();
    updateTimeline();
  }).observe(timeline);
  window.addEventListener("scroll", () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(updateTimeline);
    }
  }, { passive: true });
  updateTimeline();
}

// Background music : opt-in toggle (browsers block autoplay with sound)
const musicToggle = document.getElementById("music-toggle");
const music = document.getElementById("bg-music");

if (musicToggle && music) {
  const icon = musicToggle.querySelector("i");
  const setPlaying = (playing) => {
    musicToggle.setAttribute("aria-pressed", String(playing));
    musicToggle.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
    icon.className = playing ? "bx bx-pause" : "bx bx-play";
  };

  musicToggle.addEventListener("click", () => {
    if (music.paused) {
      music.volume = 0.5;
      music.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      music.pause();
      setPlaying(false);
    }
  });
}
