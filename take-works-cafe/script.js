const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav?.classList.toggle('is-open', !isOpen);
});

siteNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  });
});

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const hero = document.querySelector('.hero');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const name = contactForm.elements.name.value.trim();
  formStatus.textContent = `${name}さん、ご相談ありがとうございます。これはポートフォリオ用フォームのため送信は行われません。`;
  contactForm.reset();
});

if (hero) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle('show-mobile-cta', !entry.isIntersecting);
    },
    { threshold: 0.12 }
  );

  observer.observe(hero);
}
