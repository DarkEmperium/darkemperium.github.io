var swiper = new Swiper(".home-slider", {
  speed: 1500,
  spaceBetween: 5,
  centeredSlides: true,
  autoplay: { delay: 7000, disableOnInteraction: false, stopOnLast: true },
  loop: true,
});

const playButtons = document.querySelectorAll('.play-video');
playButtons.forEach(playButton => {
    playButton.addEventListener('click', () => {
        const sliderId = playButton.getAttribute('data-slider');
        const video = document.querySelector(`[data-slider="${sliderId}"] .video-container`);

        if (video) {
            const videoElement = video.querySelector('video');
            if (videoElement) {
                video.classList.remove("fade-out");
                video.classList.add("fade-in");
                videoElement.style.animation = "fadeIn 0.5s forwards";
                setTimeout(() => {
                    video.classList.add("show-video");
                    videoElement.play();
                }, 500);
            }
        }

        if (typeof swiper !== 'undefined' && swiper.autoplay) {
            swiper.autoplay.stop();
        }
    });
});

const stopButtons = document.querySelectorAll('.close-video');
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

        if (typeof swiper !== 'undefined' && swiper.autoplay) {
            swiper.autoplay.start();
        }
    });
});

const animeShows = document.querySelectorAll('.anime');
animeShows.forEach(show => {
  const observer = new IntersectionObserver(entries => {
    // Check if the element is intersecting the viewport
    if (entries[0].isIntersecting) {
      // Element is intersecting the viewport, so trigger the animation
      show.animate([
        // Keyframes for the animation
        { transform: 'translateX(100%)' },
        { transform: 'none' }
      ], {
        // Animation options
        duration: 2000,
        easing: 'ease-in-out',
        fill: 'both'
      });
      // Stop observing the element
      observer.unobserve(show);
    }
  });
  // Start observing the element
  observer.observe(show);
});

const monthSpan = document.querySelector('#currentMonth');
const currentDate = new Date();
const options = { month: 'long' };
const monthName = currentDate.toLocaleString('default', options);
const year = currentDate.getFullYear();
monthSpan.innerHTML = `${monthName} ${year}`;


const username = "DarkEmperium"; // Replace with the MAL username
const watchingStatus = 1;
const completedStatus = 2;

function fetchAnimeList(url, containerId, expectedStatus, retryCount = 3, delay = 500) {
    let attempt = 0;
    const container = document.getElementById(containerId);
    
    container.innerHTML = "<p class='loading-message'>Fetching Anime List From Server</p>";

    function tryFetch() {
        fetch(`https://corsproxy.io/?url=${url}`) // Backup option: https://api.allorigins.win/raw?url=${encodeURIComponent(url)}
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
                        let originalImageUrl = anime.anime_image_path.replace(/\/r\/\d+x\d+\//, "/"); // Remove resizing part

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

const watchingUrl = `https://myanimelist.net/animelist/${username}/load.json?status=${watchingStatus}`;
fetchAnimeList(watchingUrl, "watching-container", watchingStatus);

const completedUrl = `https://myanimelist.net/animelist/${username}/load.json?status=${completedStatus}`;
fetchAnimeList(completedUrl, "completed-container", completedStatus);
