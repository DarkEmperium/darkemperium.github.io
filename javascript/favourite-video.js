// Click-to-load YouTube players (thumbnails until played)
document.querySelectorAll(".yt-facade").forEach((facade) => {
  facade.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${facade.dataset.yt}?autoplay=1&rel=0`;
    iframe.title = facade.getAttribute("aria-label").replace("Play", "Playing");
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    const frame = document.createElement("div");
    frame.className = "video-frame";
    frame.appendChild(iframe);
    facade.replaceWith(frame);
  });
});

// Source filter
const videoCards = Array.from(document.querySelectorAll(".video-card"));
const videoFilters = Array.from(document.querySelectorAll(".filter"));

videoFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const source = button.dataset.filter;
    videoFilters.forEach((f) => f.classList.toggle("is-active", f === button));

    const shown = videoCards.filter((card) => {
      const match = source === "all" || card.dataset.source === source;
      card.classList.toggle("is-hidden", !match);
      return match;
    });
    const counter = document.getElementById("videos-shown");
    if (counter) counter.textContent = shown.length;
    if (window.UI) UI.animateIn(shown);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
});
