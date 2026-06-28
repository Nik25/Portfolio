/*
  script.js
  Adds interactions: typing animation, theme toggle, scroll reveal, smooth scroll helpers,
  back-to-top button, mobile menu auto-close, and simple contact form handling.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Typing animation for role
  const roles = ['Full Stack Java Developer', 'Computer Science Student', 'Problem Solver'];
  const typedEl = document.getElementById('typed-role');
  let rIndex = 0, cIndex = 0, deleting = false;

  function typeTick(){
    const full = roles[rIndex];
    if(!deleting){
      typedEl.textContent = full.slice(0, cIndex+1);
      cIndex++;
      if(cIndex === full.length){
        deleting = true;
        setTimeout(typeTick, 1200);
        return;
      }
    } else {
      typedEl.textContent = full.slice(0, cIndex-1);
      cIndex--;
      if(cIndex === 0){
        deleting = false;
        rIndex = (rIndex + 1) % roles.length;
      }
    }
    setTimeout(typeTick, deleting ? 60 : 120);
  }
  if(typedEl) typeTick();

  // Scroll reveal using IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal, section, .card, .skill-card, .timeline-item');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('show');
        // unobserve to improve performance
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  revealEls.forEach(el => obs.observe(el));

  // Theme toggle
  const themeBtn = document.getElementById('themeToggle');
  const root = document.documentElement;
  function setTheme(light){
    if(light){
      document.body.classList.add('light');
      themeBtn.textContent = 'Light';
    } else {
      document.body.classList.remove('light');
      themeBtn.textContent = 'Dark';
    }
    localStorage.setItem('nh_theme_light', !!light);
  }
  const saved = localStorage.getItem('nh_theme_light');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  setTheme(saved === 'true' || (saved === null && systemPrefersLight));
  themeBtn && themeBtn.addEventListener('click', ()=> setTheme(!document.body.classList.contains('light')));

  // Back to top
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 400) backBtn.style.display = 'block'; else backBtn.style.display = 'none';
  });
  backBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  // Collapse mobile menu on nav link click
  const navLinks = document.querySelectorAll('.nav-link');
  const bsCollapse = document.getElementById('navMenu');
  navLinks.forEach(link => link.addEventListener('click', ()=>{
    if(window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none'){
      const collapse = bootstrap.Collapse.getInstance(bsCollapse) || new bootstrap.Collapse(bsCollapse, {toggle:false});
      collapse.hide();
    }
  }));

  // Contact form handling (simple client-side stub)
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    if(!name || !email || !message){
      alert('Please fill all fields before sending.');
      return;
    }
    // In production, replace with AJAX request to serverless endpoint or email service.
    alert('Thanks, ' + name + '! Your message has been received.');
    contactForm.reset();
  });
});
