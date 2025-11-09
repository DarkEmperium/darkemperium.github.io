document.addEventListener("DOMContentLoaded", () => {
  function generateBoxShadow(count, heightPx) {
    let shadows = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100; // percent of viewport width
      const y = Math.random() * heightPx; // pixels
      shadows.push(`${x}vw ${y}px #FFF`);
    }
    return shadows.join(", ");
  }

  const stars = document.getElementById("stars");
  const stars2 = document.getElementById("stars2");
  const stars3 = document.getElementById("stars3");

  const shadows1 = generateBoxShadow(700, 2000);
  const shadows2 = generateBoxShadow(200, 2000);
  const shadows3 = generateBoxShadow(100, 2000);

  stars.style.boxShadow = shadows1;
  stars2.style.boxShadow = shadows2;
  stars3.style.boxShadow = shadows3;

  // Mirror ::after shadows to avoid gaps
  const style = document.createElement("style");
  style.textContent = `
        #stars::after { box-shadow: ${shadows1}; }
        #stars2::after { box-shadow: ${shadows2}; }
        #stars3::after { box-shadow: ${shadows3}; }
      `;
  document.head.appendChild(style);
});

const sr = ScrollReveal({
  duration: 2500,
  reset: false,
});

sr.reveal(".video-container", { origin: "bottom", distance: "70px" });

document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#title-exchange', {
        strings: ['YOUTUBE', 'EDITED'],
        typeSpeed: 80,
        loop: true,
        backSpeed: 80,
        showCursor: false,
    });
});
