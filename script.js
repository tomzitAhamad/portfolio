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

  // ============================================
  // Interactive Plexus Particle Constellation Canvas
  // ============================================
  const plexusCanvas = document.getElementById("plexus-canvas");
  if (plexusCanvas) {
    const ctx = plexusCanvas.getContext("2d");
    let width, height, dpr;
    let particles = [];
    let animationFrameId;

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
      radius: 175
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    window.addEventListener("mouseleave", () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    });

    function getPaletteColor(x, w) {
      const rand = Math.random();
      if (rand < 0.16) return "#ffffff"; // Crisp white stars

      const ratio = x / Math.max(w, 1);
      if (ratio < 0.36) {
        // Pink / Crimson / Magenta region (matches left of user screenshot)
        const pinks = ["#ff014f", "#ff2a85", "#f72585", "#ff5c8a", "#e01e5a"];
        return pinks[Math.floor(Math.random() * pinks.length)];
      } else if (ratio < 0.72) {
        // Cyan / Electric Blue / Teal region (matches center of user screenshot)
        const cyans = ["#00e5ff", "#00b4d8", "#48cae4", "#06d6a0", "#72efdd"];
        return cyans[Math.floor(Math.random() * cyans.length)];
      } else {
        // Lime / Neon Green region (matches right of user screenshot)
        const greens = ["#70e000", "#9ef01a", "#06d6a0", "#38b000", "#aacc00"];
        return greens[Math.floor(Math.random() * greens.length)];
      }
    }

    function hexToRgba(hex, alpha) {
      if (!hex || hex === "#ffffff") return `rgba(255, 255, 255, ${alpha})`;
      let r = 255, g = 1, b = 79;
      if (hex.startsWith("#")) {
        const c = hex.slice(1);
        if (c.length === 6) {
          r = parseInt(c.slice(0, 2), 16);
          g = parseInt(c.slice(2, 4), 16);
          b = parseInt(c.slice(4, 6), 16);
        }
      }
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
        this.y = initial ? Math.random() * height : Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.65;
        this.vy = (Math.random() - 0.5) * 0.65;
        this.radius = Math.random() * 2.2 + 1.4;
        this.color = getPaletteColor(this.x, width);
        this.baseAlpha = Math.random() * 0.35 + 0.65;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off canvas boundaries
        if (this.x < 0) { this.x = 0; this.vx *= -1; }
        else if (this.x > width) { this.x = width; this.vx *= -1; }
        if (this.y < 0) { this.y = 0; this.vy *= -1; }
        else if (this.y > height) { this.y = height; this.vy *= -1; }

        // Subtle color evolution matching spatial area
        if (Math.random() < 0.015) {
          this.color = getPaletteColor(this.x, width);
        }

        // Gentle interactive mouse repulsion
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 1.8;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(this.color, this.baseAlpha);
        ctx.shadowBlur = this.radius > 2.2 ? 12 : 7;
        ctx.shadowColor = this.color;
        ctx.fill();

        // White core for luminous glowing star appearance
        if (this.radius > 2.3 || this.color === "#ffffff") {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function initCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      plexusCanvas.width = Math.floor(width * dpr);
      plexusCanvas.height = Math.floor(height * dpr);
      plexusCanvas.style.width = width + "px";
      plexusCanvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scale particle count dynamically based on screen resolution
      const count = Math.min(95, Math.max(45, Math.floor((width * height) / 13000)));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initCanvas();
      }, 150);
    });

    const maxLineDist = 135;
    const maxTriangleDist = 95;

    function animatePlexus() {
      ctx.clearRect(0, 0, width, height);

      const pLen = particles.length;

      // Update positions
      for (let i = 0; i < pLen; i++) {
        particles[i].update();
      }

      // Draw Translucent Geometric Triangles (Authentic Plexus look matching reference)
      let trianglesDrawn = 0;
      for (let i = 0; i < pLen && trianglesDrawn < 48; i++) {
        for (let j = i + 1; j < pLen && trianglesDrawn < 48; j++) {
          const d1 = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d1 < maxTriangleDist) {
            for (let k = j + 1; k < pLen && trianglesDrawn < 48; k++) {
              const d2 = Math.hypot(particles[j].x - particles[k].x, particles[j].y - particles[k].y);
              const d3 = Math.hypot(particles[i].x - particles[k].x, particles[i].y - particles[k].y);

              if (d2 < maxTriangleDist && d3 < maxTriangleDist) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.lineTo(particles[k].x, particles[k].y);
                ctx.closePath();

                // Luminous translucent multifaceted polygon fill
                const triColor = hexToRgba(particles[i].color, 0.09);
                ctx.fillStyle = triColor;
                ctx.fill();
                trianglesDrawn++;
              }
            }
          }
        }
      }

      // Draw Interconnected Constellation Lines
      for (let i = 0; i < pLen; i++) {
        for (let j = i + 1; j < pLen; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLineDist) {
            const alpha = (1 - dist / maxLineDist) * 0.42;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = hexToRgba(particles[i].color, alpha);
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw connections to mouse cursor
        if (mouse.active) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const mAlpha = (1 - mdist / mouse.radius) * 0.58;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = hexToRgba(particles[i].color, mAlpha);
            ctx.lineWidth = 1.1;
            ctx.stroke();
          }
        }

        // Draw particle node
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(animatePlexus);
    }

    initCanvas();
    animatePlexus();
  }
});
