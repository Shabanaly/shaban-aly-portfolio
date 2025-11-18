// small interactive bits
document.getElementById('year').textContent = new Date().getFullYear();

// smooth scroll for nav links
document.querySelectorAll('.nav a, .cta-row a').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// Simple feedback on submit
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', e=>{
    // allow default Formspree submit but show quick feedback
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'جارٍ الإرسال...';
    setTimeout(()=>{
      btn.disabled = false;
      btn.textContent = 'أرسل';
    },3000);
  });
}
