// Typing Effect
const texts = [
  "Flutter Developer.",
  "Web Developer.",
  "App Developer.",
  "Full-Stack Developer."
];

let speed = 90;
const textElements = document.querySelector(".typing");
let textIndex = 0;
let charIndex = 0;

function typeWriter() {
  if (!textElements) return;
  if (charIndex < texts[textIndex].length) {
    textElements.innerHTML += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, speed);
  } else {
    setTimeout(eraseText, 1600);
  }
}

function eraseText() {
  if (!textElements) return;
  if (textElements.innerHTML.length > 0) {
    textElements.innerHTML = textElements.innerHTML.slice(0, -1);
    setTimeout(eraseText, 45);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    charIndex = 0;
    setTimeout(typeWriter, 400);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  typeWriter();

  // Active Navbar Link on Scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav ul li a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // ============================================
  // Code Terminal & Stats Counter Animation on Scroll (Up & Down)
  // ============================================
  const codeCard = document.getElementById("codeTerminalCard");
  let counterAnimationFrames = [];

  function animateCounters() {
    counterAnimationFrames.forEach((id) => cancelAnimationFrame(id));
    counterAnimationFrames = [];

    const statElements = document.querySelectorAll(".stat-num[data-target]");
    statElements.forEach((el) => {
      el.classList.remove("stat-done");
      const target = parseInt(el.getAttribute("data-target"), 10);
      const prefix = el.getAttribute("data-prefix") || "";
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1100; // ms
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth cubic ease out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easeOut * target);

        let displayVal = currentVal;
        if (prefix && currentVal < 10) {
          displayVal = `${prefix}${currentVal}`;
        } else if (!prefix && target >= 10 && currentVal < 10) {
          displayVal = `0${currentVal}`;
        }

        el.textContent = `${displayVal}${suffix}`;

        if (progress < 1) {
          const frameId = requestAnimationFrame(update);
          counterAnimationFrames.push(frameId);
        } else {
          const finalVal = prefix && target < 10 ? `${prefix}${target}` : target;
          el.textContent = `${finalVal}${suffix}`;
          el.classList.add("stat-done");
        }
      }

      const initialFrame = requestAnimationFrame(update);
      counterAnimationFrames.push(initialFrame);
    });
  }

  function resetCounters() {
    counterAnimationFrames.forEach((id) => cancelAnimationFrame(id));
    counterAnimationFrames = [];

    const statElements = document.querySelectorAll(".stat-num[data-target]");
    statElements.forEach((el) => {
      const suffix = el.getAttribute("data-suffix") || "";
      el.textContent = `00${suffix}`;
      el.classList.remove("stat-done");
    });
  }

  if (codeCard) {
    const terminalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Scrolled into view: trigger code reveal and numbers count-up
            codeCard.classList.add("is-active");
            animateCounters();
          } else {
            // Scrolled out of view (upwards or downwards): reset so it can re-trigger
            codeCard.classList.remove("is-active");
            resetCounters();
          }
        });
      },
      {
        threshold: 0.2, // Triggers when 20% of terminal is visible
      }
    );

    terminalObserver.observe(codeCard);
  }

  // ============================================
  // Full Page Scroll Reveal Animations
  // ============================================
  const revealElements = document.querySelectorAll(
    ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom"
  );

  // Apply stagger delay to children of .stagger-grid
  const staggerGrids = document.querySelectorAll(".stagger-grid");
  staggerGrids.forEach((grid) => {
    Array.from(grid.children).forEach((child, index) => {
      child.style.setProperty("--stagger-delay", `${index * 0.08}s`);
    });
  });

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Triggers when scrolling DOWN into view OR scrolling UP into view
            entry.target.classList.add("is-visible");
          } else {
            // Resets when scrolled out of view in EITHER direction (up or down)
            // so that reverse scrolling always re-animates smoothly!
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "-15px 0px -15px 0px",
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }
});
