/* ============================================================
   TAKE WORKS — main.js（2026-09-24 整理）
   旧版のマウス追従の点・カウンター等、使われていない処理は削除した
   ============================================================ */

// ── ナビ: スクロールで背景を敷く ──
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── ナビ: スマホのメニュー ──
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('navMobile');
burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(isOpen));
  burger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'メニューを開く');
  });
});

// ── 音の波形: バーを並べる（高さは毎回同じになるよう固定の並び） ──
const WAVE = [.35,.6,.9,.5,.75,1,.55,.8,.4,.7,.95,.6,.45,.8,.5,.3,.65,.4,.55,.35,.5,.3,.45,.25];
document.querySelectorAll('.wave').forEach(el => {
  const n = el.classList.contains('wave--mini') ? 14 : WAVE.length;
  for (let i = 0; i < n; i++) {
    const bar = document.createElement('i');
    bar.style.setProperty('--h', WAVE[i % WAVE.length]);
    bar.style.setProperty('--d', (i * 0.13).toFixed(2));
    el.appendChild(bar);
  }
});

// ── 出現アニメ ──
const revealEls = document.querySelectorAll('.reveal, .fade-in');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

// ── ナビ: いまいる欄を金色に ──
const navLinks = document.querySelectorAll('.nav__links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--gold)' : '';
    });
  });
}, { threshold: 0.4 });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));
