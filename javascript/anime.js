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

// Fetch Watching List
const watchingUrl = `https://myanimelist.net/animelist/${username}/load.json?status=${watchingStatus}`;
fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(watchingUrl)}`)
    .then(response => {
        if (!response.ok) throw new Error("Bad Network Response !");
        return response.json();
    })
    .then(data => {
        const watchingContainer = document.getElementById("watching-container");
        

        if (Array.isArray(data) && data.length > 0) {
            data.forEach((anime) => {
                let originalImageUrl = anime.anime_image_path.replace(/\/r\/\d+x\d+\//, "/"); // Remove the resizing part
                
                const box = document.createElement("div");
                box.className = "box";
                box.innerHTML = `<div class="box-img"><img src="${originalImageUrl}" alt="${anime.anime_title}"></div>`;
                watchingContainer.appendChild(box);
            });
        } else {
            watchingContainer.innerHTML = "<p class='error-message'>No anime found in the watching list !</p>";
        }
    })
    .catch(error => {
        console.error("Error fetching watching list : ", error);
        const watchingContainer = document.getElementById("watching-container");
        watchingContainer.innerHTML = "<p class='error-message'>Failed to load watching list !</p>";
    });

// Fetch Watched List
const completedUrl = `https://myanimelist.net/animelist/${username}/load.json?status=${completedStatus}`;
fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(completedUrl)}`)
    .then(response => {
        if (!response.ok) throw new Error("Bad Network Response !");
        return response.json();
    })
    .then(data => {
        const watchingContainer = document.getElementById("completed-container");
        

        if (Array.isArray(data) && data.length > 0) {
            data.forEach((anime) => {
                let originalImageUrl = anime.anime_image_path.replace(/\/r\/\d+x\d+\//, "/"); // Remove the resizing part
                
                const box = document.createElement("div");
                box.className = "box";
                box.innerHTML = `<div class="box-img"><img src="${originalImageUrl}" alt="${anime.anime_title}"></div>`;
                watchingContainer.appendChild(box);
            });
        } else {
            watchingContainer.innerHTML = "<p class='error-message'>No anime found in the watched list !</p>";
        }
    })
    .catch(error => {
        console.error("Error fetching watched list : ", error);
        const watchingContainer = document.getElementById("completed-container");
        watchingContainer.innerHTML = "<p class='error-message'>Failed to load watched list !</p>";
    });
