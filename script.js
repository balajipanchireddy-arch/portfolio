// ===== Navbar background on scroll (index page only) =====
const nav = document.getElementById('navbar');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ===== Parallax orbs on mouse move (index page only) =====
const orbs = document.querySelectorAll('.orb');
if (orbs.length) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    orbs.forEach((orb, i) => {
      orb.style.transform = `translate(${x * (i + 1) * 0.4}px, ${y * (i + 1) * 0.4}px)`;
    });
  });
}

// ===== Scroll-reveal for glass cards (both pages, only affects elements with .reveal) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal:not(.in-view)').forEach(el => observer.observe(el));

// ===== Contact form -> opens the visitor's email app pre-filled (index page only) =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const message = document.getElementById('cf-message').value;
    const subject = encodeURIComponent('Portfolio contact from ' + name);
    const body = encodeURIComponent(message + '\n\n— from ' + email);
    
    // Your email goes in "to"
    const to = 'balajipanchireddy@gmail.com';
    // Visitor's email goes in "reply-to" so you can reply directly
    const replyTo = encodeURIComponent(email);
    
    window.location.href = `mailto:${to}?reply-to=${replyTo}&subject=${subject}&body=${body}`;
  });
}

// ===== Print button (resume page only) =====
const printBtn = document.getElementById('print-btn');
if (printBtn) {
  printBtn.addEventListener('click', () => window.print());
}

// ===== Custom glossy cursor (desktop only) =====
if (window.matchMedia('(pointer: fine)').matches) {
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing(){
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .social-btn, .project-card, .glass, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}
