function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 300;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

window.addEventListener("scroll", reveal);


// Get the current date
const currentDate = new Date();

// Get the current month (0-indexed, so we add 1)
const currentMonth = currentDate.getMonth() + 1;

// Get the game version element
const gameVersionElement = document.getElementById('gameVersion');

// Update the game version based on the current month
if (currentMonth >= 2) { // Update from February onwards
  const currentVersion = gameVersionElement.innerText.match(/\d+\.\d+/);
  const newVersion = parseFloat(currentVersion) + 0.1 * (currentMonth - 1);
  gameVersionElement.innerText = `Genshin Impact Version ${newVersion.toFixed(1)} Live Now !`;
}

