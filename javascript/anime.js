const monthSpan = document.querySelector('#currentMonth');
const currentDate = new Date();
const options = { month: 'long' };
const monthName = currentDate.toLocaleString('default', options);
const year = currentDate.getFullYear();
const watchingStatus = 1;
const completedStatus = 2;
const planToWatchStatus = 6;
const stopButtons = document.querySelectorAll('.close-video');
const playButtons = document.querySelectorAll('.play-video');
const homeSection = document.querySelector('.home');
const workerBaseUrl = "https://api.darkemperium.workers.dev";
const watchingUrl = `${workerBaseUrl}/anime?status=${watchingStatus}`;
const completedUrl = `${workerBaseUrl}/anime?status=${completedStatus}`;
const planToWatchUrl = `${workerBaseUrl}/anime?status=${planToWatchStatus}`;

monthSpan.innerHTML = `${monthName} ${year}`;

var swiper = new Swiper(".home-slider", {
  speed: 900,
  effect: "fade",
  fadeEffect: { crossFade: true },
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: ".home-slider .swiper-pagination",
    clickable: true,
  },
  keyboard: { enabled: true },
});

const homeAnchors = new WeakMap();

document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.querySelector('body > .video-container.show-video .close-video');
    if (open) open.click();
});

playButtons.forEach(playButton => {
    playButton.addEventListener('click', () => {
        const sliderId = playButton.getAttribute('data-slider');
        const videoContainer = document.querySelector(`[data-slider="${sliderId}"] .video-container`);

        if (videoContainer) {
            const videoElement = videoContainer.querySelector('video');

            if (videoElement && !videoElement.src) {
                const realSrc = videoElement.getAttribute('data-src');
                if (realSrc) {
                    videoElement.src = realSrc;
                }
            }

            if (videoElement) {
                // lift the overlay out of the slider so it sits above everything, and remember where it came from
                if (videoContainer.parentElement !== document.body) {
                    homeAnchors.set(videoContainer, videoContainer.parentElement);
                    document.body.appendChild(videoContainer);
                }
                document.documentElement.style.overflow = "hidden";
                videoContainer.classList.remove("fade-out");
                videoContainer.classList.add("fade-in");
                videoElement.style.animation = "fadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards";
                setTimeout(() => {
                    videoContainer.classList.add("show-video");
                    videoElement.play();
                }, 350);
            }
        }

        if (typeof swiper !== 'undefined') {
            swiper.autoplay.stop();
            swiper.allowTouchMove = false;
            homeSection.classList.add('is-paused');
        }

    });
});

stopButtons.forEach(stopButton => {
    stopButton.addEventListener('click', () => {
        const video = stopButton.closest('.video-container');

        if (video) {
            const videoElement = video.querySelector('video');
            if (videoElement) {
                video.classList.remove("fade-in");
                video.classList.add("fade-out");
                videoElement.style.animation = "fadeOut 0.3s ease-in forwards";
                setTimeout(() => {
                    video.classList.remove("show-video", "fade-out");
                    videoElement.pause();
                    const home = homeAnchors.get(video);
                    if (home) home.appendChild(video);
                    document.documentElement.style.overflow = "";
                }, 300);
            }
        }

        if (typeof swiper !== 'undefined') {
            swiper.allowTouchMove = true;
            swiper.autoplay.start();
            homeSection.classList.remove('is-paused');
        }

    });
});

function escapeHtml(text) {
    return String(text ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function renderSkeletons(container, count = 6) {
    container.innerHTML = Array.from({ length: count }, () =>
        `<div class="anime-card is-skeleton" aria-hidden="true"><div class="anime-card__poster"></div><p class="anime-card__title"></p></div>`
    ).join("");
}

function createAnimeCard(anime) {
    const originalImageUrl = anime.anime_image_path.replace(/\/r\/\d+x\d+\//, "/"); // Remove Resizing Part
    const title = anime.anime_title_eng || anime.anime_title;
    const genres = (anime.genres || []).slice(0, 3).map((g) => `<span>${escapeHtml(g.name)}</span>`).join("");
    const score = anime.anime_score_val ? `<span class="badge badge--score"><i class='bx bxs-star'></i>${anime.anime_score_val}</span>` : "";

    const card = document.createElement("a");
    card.className = "anime-card";
    card.dataset.cursor = "View";
    card.href = `https://myanimelist.net${anime.anime_url}`;
    card.target = "_blank";
    card.rel = "noopener";
    card.dataset.search = `${anime.anime_title} ${anime.anime_title_eng || ""}`.toLowerCase();
    card.innerHTML = `
        <div class="anime-card__poster">
            <img src="${escapeHtml(originalImageUrl)}" alt="${escapeHtml(title)}" loading="lazy" decoding="async">
            ${score}
            <div class="anime-card__overlay">
                <div class="anime-card__genres">${genres}</div>
                <span class="anime-card__open">View on MAL <i class='bx bx-link-external'></i></span>
            </div>
        </div>
        <p class="anime-card__title">${escapeHtml(title)}</p>`;

    const img = card.querySelector("img");
    const markLoaded = () => img.classList.add("is-loaded");
    if (img.complete && img.naturalWidth) markLoaded();
    else img.addEventListener("load", markLoaded, { once: true });

    return card;
}

function fetchAnimeList(url, containerId, expectedStatus, retryCount = 3, delay = 500) {
    let attempt = 0;
    const container = document.getElementById(containerId);
    const countBadge = document.getElementById(containerId.replace("-container", "-count"));

    renderSkeletons(container);

    function tryFetch() {

        fetch(url) // Alternative Option: https://api.allorigins.win/raw?url=${encodeURIComponent(url)}
            .then(response => {
                if (!response.ok) throw new Error("Bad Network Response !");
                return response.json();
            })
            .then(data => {
                container.innerHTML = "";

                const filteredData = Array.isArray(data) ? data.filter(anime => anime.status === expectedStatus) : [];
                if (countBadge) countBadge.textContent = filteredData.length;

                if (filteredData.length > 0) {
                    const cards = filteredData.map((anime) => createAnimeCard(anime));
                    container.append(...cards);
                    if (window.UI && !UI.reduceMotion) {
                        UI.reveal(cards, 35, 10);
                        cards.forEach((card) => UI.tilt(card.querySelector(".anime-card__poster")));
                    } else {
                        cards.forEach((card) => card.classList.add("is-visible"));
                    }
                    applySearch();
                } else {
                    container.innerHTML = "<p class='empty-message'>No titles in this list yet</p>";
                }
            })
            .catch(error => {
                console.error(`Error Fetching List: ${error}`);
                attempt++;
                if (attempt < retryCount) {
                    console.log(`Retrying: (${attempt}/${retryCount})`);
                    setTimeout(tryFetch, delay);
                } else {
                    container.innerHTML = "<p class='error-message'>The watch list could not be loaded. Please try again later</p>";
                    if (countBadge) countBadge.textContent = "!";
                }
            });
    }

    tryFetch();
}

// Search Filter
const searchInput = document.getElementById("anime-search");

function applySearch() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    document.querySelectorAll(".anime-container").forEach((container) => {
        const cards = container.querySelectorAll(".anime-card:not(.is-skeleton)");
        if (!cards.length) return;
        let shown = 0;
        cards.forEach((card) => {
            const match = !query || card.dataset.search.includes(query);
            card.hidden = !match;
            if (match) shown++;
        });
        let note = container.querySelector(".search-empty");
        if (!shown && !note) {
            note = document.createElement("p");
            note.className = "empty-message search-empty";
            container.appendChild(note);
        }
        if (note) {
            note.hidden = shown > 0;
            note.textContent = `No titles match "${searchInput.value.trim()}"`;
        }
    });
}

if (searchInput) searchInput.addEventListener("input", applySearch);

// Pill Tabs With Sliding Indicator + Scroll Spy
const pillTabs = Array.from(document.querySelectorAll(".pill-tab"));
const pillIndicator = document.querySelector(".pill-indicator");

function moveIndicator(tab) {
    if (!pillIndicator || !tab) return;
    pillTabs.forEach((t) => t.classList.toggle("is-active", t === tab));
    pillIndicator.style.width = `${tab.offsetWidth}px`;
    pillIndicator.style.transform = `translateX(${tab.offsetLeft}px)`;
}

moveIndicator(pillTabs[0]);
window.addEventListener("resize", () => moveIndicator(document.querySelector(".pill-tab.is-active")));
pillTabs.forEach((tab) => tab.addEventListener("click", () => moveIndicator(tab)));

const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            moveIndicator(pillTabs.find((t) => t.getAttribute("href") === `#${entry.target.id}`));
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });

document.querySelectorAll(".anime[id]").forEach((section) => spy.observe(section));

fetchAnimeList(watchingUrl, "watching-container", watchingStatus);
fetchAnimeList(completedUrl, "completed-container", completedStatus);
fetchAnimeList(planToWatchUrl, "plan-to-watch-container", planToWatchStatus);
