const texts = [
  "Flutter Development",
  "App Development",
  "UI Design",
  "Firebase",
  "Cross Platform Apps"
];

let speed = 100;

const textElements = document.querySelector(".typing");

let textIndex = 0;
let charIndex = 0;

function typeWriter() {

  if(charIndex < texts[textIndex].length){

    textElements.innerHTML += texts[textIndex].charAt(charIndex);

    charIndex++;

    setTimeout(typeWriter, speed);

  }
  else{

    setTimeout(eraseText, 1500);

  }

}

function eraseText(){

  if(textElements.innerHTML.length > 0){

    textElements.innerHTML =
      textElements.innerHTML.slice(0, -1);

    setTimeout(eraseText, 50);

  }
  else{

    textIndex++;

    if(textIndex >= texts.length){
      textIndex = 0;
    }

    charIndex = 0;

    setTimeout(typeWriter, 500);

  }

}

window.onload = typeWriter;
// About Button Click

const aboutBtn = document.querySelector(".about-btn");

aboutBtn.addEventListener("click", () => {

  alert("Your CV download link will be added later!");

});
// Skills Animation

const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {

  card.addEventListener("mouseenter", () => {

    card.style.transform = "translateY(-12px) scale(1.05)";

  });

  card.addEventListener("mouseleave", () => {

    card.style.transform = "translateY(0) scale(1)";

  });

});
// Project Card Hover Animation

const projects = document.querySelectorAll(".project-card");

projects.forEach((project) => {

  project.addEventListener("mouseenter", () => {

    project.style.transform =
      "translateY(-10px) scale(1.02)";

  });

  project.addEventListener("mouseleave", () => {

    project.style.transform =
      "translateY(0) scale(1)";

  });

});