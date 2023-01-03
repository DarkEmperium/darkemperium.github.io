var swiper = new Swiper(".home-slider", {
  speed: 1500,
  spaceBetween: 5,
  centeredSlides: true,
  autoplay: { delay: 7000, disableOnInteraction: false, stopOnLast: true },
  loop: true,
});

const playButtons = document.querySelectorAll('.play-video');
for (let playButton of playButtons) {
  playButton.addEventListener('click', () => {
    // Get the data-slider value of the play button that was clicked
    const sliderId = playButton.getAttribute('data-slider');
    // Find the corresponding video container using the data-slider value
    const video = document.querySelector(`[data-slider="${sliderId}"] .video-container`);
    // Add fade in animation to the video
    video.querySelector('video').style.animation = "fadeIn 0.5s forwards";
    // Wait for the animation to complete before showing the video container and playing the video
    setTimeout(() => {
      video.classList.add("show-video");
      video.querySelector('video').play();
    }, 500);
    // Stop the Swiper when the play button is clicked
    swiper.autoplay.stop();
  });
}

const stopButtons = document.querySelectorAll('.close-video');
for (let stopButton of stopButtons) {
  stopButton.addEventListener('click', () => {
    // Get the data-slider value of the stop button that was clicked
    const sliderId = stopButton.getAttribute('data-slider');
    // Find the corresponding video container using the data-slider value
    const video = document.querySelector(`[data-slider="${sliderId}"] .video-container`);
    // Add fade out animation to the video
    video.querySelector('video').style.animation = "fadeOut 0.5s forwards";
    // Wait for the animation to complete before hiding the video container and pausing the video
    setTimeout(() => {
    video.classList.remove("show-video");
    video.querySelector('video').pause();
    }, 500);
    // Start the Swiper again when the close button is clicked
    swiper.autoplay.start();
  });
}

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
        duration: 1000,
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
