// Splash screen logic
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
  }, 2500);
});

// Fade-in scroll animation
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  faders.forEach(el => appearOnScroll.observe(el));
});


// Splash screen logic
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
  }, 2500);
});

// Fade-in scroll animation
document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  faders.forEach(el => appearOnScroll.observe(el));

});

// Typing effect for hero section
document.addEventListener('DOMContentLoaded', () => {
  const texts = ["Software Engineer.", "Web Designer.", "Data Scientist."];
  const typingElement = document.querySelector(".typing-text");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = texts[textIndex];
    const displayedText = currentText.substring(0, charIndex);
    typingElement.textContent = displayedText;

    if (!isDeleting && charIndex < currentText.length) {
      charIndex++;
      setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 60);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(typeEffect, 1000);
      } else {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 300);
      }
    }
  }

  typeEffect();
});

// Interactive skill card hover effect
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * 10; // tilt sensitivity
    const tiltY = ((x - centerX) / centerX) * -10;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--tiltX', `${tiltY}deg`);
    card.style.setProperty('--tiltY', `${tiltX}deg`);
  });
});

// ===== Background Network Effect =====
const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const dots = [];
const DOT_COUNT = 80;
const CONNECT_DISTANCE = 150;

class Dot {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.6;
    this.vy = (Math.random() - 0.5) * 0.6;
    this.radius = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.4 + 0.3; // fade variation
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha + 0.2})`;
    ctx.fill();
  }
}

for (let i = 0; i < DOT_COUNT; i++) dots.push(new Dot());

function connectDots() {
  for (let i = 0; i < DOT_COUNT; i++) {
    for (let j = i + 1; j < DOT_COUNT; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECT_DISTANCE) {
        const opacity = 1 - dist / CONNECT_DISTANCE;
        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  dots.forEach(dot => {
    dot.move();
    dot.draw();
  });
  connectDots();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});


