const monthSpan = document.querySelector('#currentMonth');
const currentDate = new Date();
const options = { month: 'long' };
const monthName = currentDate.toLocaleString('default', options);
const year = currentDate.getFullYear();
const username = "DarkEmperium"; // myAnimeList MAL Username
const watchingStatus = 1;
const completedStatus = 2;
const planToWatchStatus = 6;
const animeShows = document.querySelectorAll('.anime');
const stopButtons = document.querySelectorAll('.close-video');
const playButtons = document.querySelectorAll('.play-video');
const watchingUrl = `https://myanimelist.net/animelist/${username}/load.json?status=${watchingStatus}`;
const completedUrl = `https://myanimelist.net/animelist/${username}/load.json?status=${completedStatus}`;
const planToWatchUrl = `https://myanimelist.net/animelist/${username}/load.json?status=${planToWatchStatus}`;

monthSpan.innerHTML = `${monthName} ${year}`;

var swiper = new Swiper(".home-slider", {
  speed: 1300,
  centeredSlides: true,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  loop: true,
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 2,
  },
  preloadImages: false,
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
                videoContainer.classList.remove("fade-out");
                videoContainer.classList.add("fade-in");
                videoElement.style.animation = "fadeIn 0.5s forwards";
                setTimeout(() => {
                    videoContainer.classList.add("show-video");
                    videoElement.play();
                }, 500);
            }
        }

        if (typeof swiper !== 'undefined') {
            swiper.autoplay.stop();
            swiper.allowTouchMove = false;
        }

    });
});

stopButtons.forEach(stopButton => {
    stopButton.addEventListener('click', () => {
        const sliderId = stopButton.getAttribute('data-slider');
        const video = document.querySelector(`[data-slider="${sliderId}"] .video-container`);

        if (video) {
            const videoElement = video.querySelector('video');
            if (videoElement) {
                video.classList.remove("fade-in");
                video.classList.add("fade-out");
                videoElement.style.animation = "fadeOut 0.5s forwards";
                setTimeout(() => {
                    video.classList.remove("show-video");
                    videoElement.pause();
                }, 500);
            }
        }

        if (typeof swiper !== 'undefined') {
            swiper.allowTouchMove = true;
            swiper.autoplay.start();
        }

    });
});

animeShows.forEach(show => {
  const observer = new IntersectionObserver(entries => {
    
    if (entries[0].isIntersecting) {
      show.animate([
        { transform: 'translateX(100%)' },
        { transform: 'none' }
      ], {
        duration: 2000,
        easing: 'ease-in-out',
        fill: 'both'
      });
      observer.unobserve(show);
    }
  });
  observer.observe(show);
});

function fetchAnimeList(url, containerId, expectedStatus, retryCount = 3, delay = 500) {
    let attempt = 0;
    const container = document.getElementById(containerId);
    
    container.innerHTML = "<p class='loading-message'>Fetching Anime List From Server</p>";

    function tryFetch() {
        fetch(`https://corsproxy.io/?url=${url}`) // Alternative Option: https://api.allorigins.win/raw?url=${encodeURIComponent(url)}
            .then(response => {
                console.log(response);
                if (!response.ok) throw new Error("Bad Network Response !");
                return response.json();
            })
            .then(data => {
                container.innerHTML = "";

                const filteredData = Array.isArray(data) ? data.filter(anime => anime.status === expectedStatus) : [];

                if (filteredData.length > 0) {
                    filteredData.forEach((anime) => {
                        let originalImageUrl = anime.anime_image_path.replace(/\/r\/\d+x\d+\//, "/"); // Remove Resizing Part

                        const box = document.createElement("div");
                        box.className = "box";
                        box.innerHTML = `<div class="box-img"><img src="${originalImageUrl}" alt="${anime.anime_title}"></div>`;
                        container.appendChild(box);
                    });
                } else {
                    container.innerHTML = "<p class='error-message'>No Anime Found In The List</p>";
                }
            })
            .catch(error => {
                console.error(`Error Fetching List: ${error}`);
                attempt++;
                if (attempt < retryCount) {
                    console.log(`Retrying: (${attempt}/${retryCount})`);
                    setTimeout(tryFetch, delay);
                } else {
                    container.innerHTML = "<p class='error-message'>Failed To Load Anime List</p>";
                }
            });
    }

    tryFetch();
}

fetchAnimeList(watchingUrl, "watching-container", watchingStatus);
fetchAnimeList(completedUrl, "completed-container", completedStatus);
fetchAnimeList(planToWatchUrl, "plan-to-watch-container", planToWatchStatus);
