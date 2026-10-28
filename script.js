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
});
