/* ==========================================================================
   GUHAYA INNOVATION — main.js
   Nav toggle, scroll-driven header, reveal-on-scroll, counters,
   back-to-top, blueprint draft-lines, filterable grid, contact form.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- mobile nav ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    }));
  }

  /* ---------- header on scroll ---------- */
  const header = document.querySelector('.site-header');
  const backTop = document.querySelector('.back-top');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (backTop) backTop.classList.toggle('show', y > 700);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el, i) => {
      el.style.setProperty('--i', i % 8);
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- animated counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(c => cio.observe(c));
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---------- blueprint ambient draft-lines ---------- */
  document.querySelectorAll('.blueprint').forEach(bp => {
    for (let i = 0; i < 4; i++) {
      const line = document.createElement('div');
      line.className = 'draft-line';
      const w = 60 + Math.random() * 160;
      line.style.width = w + 'px';
      line.style.height = '1px';
      line.style.top = (10 + Math.random() * 80) + '%';
      line.style.left = (Math.random() * 70) + '%';
      line.style.opacity = '0';
      line.animate(
        [
          { opacity: 0, transform: 'scaleX(0)' },
          { opacity: .45, transform: 'scaleX(1)' },
          { opacity: .45, transform: 'scaleX(1)' },
          { opacity: 0, transform: 'scaleX(0)' }
        ],
        { duration: 6000 + Math.random() * 4000, delay: i * 1200, iterations: Infinity }
      );
      bp.appendChild(line);
    }
  });

  /* ---------- filterable service grid (services.html) ---------- */
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.service-card[data-division]');
  if (chips.length && cards.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const div = chip.dataset.filter;
        cards.forEach(card => {
          const show = div === 'all' || card.dataset.division === div;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

/* ---------- contact form (Formspree) ---------- */
const form = document.querySelector('#contact-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const success = document.querySelector('.form-success');
    const button = form.querySelector('button[type="submit"]');

    button.disabled = true;
    button.innerHTML = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();

        if (success) {
          success.classList.add('show');
          success.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }

        button.disabled = false;
        button.innerHTML = 'Send Enquiry <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
      } else {
        throw new Error('Form submission failed');
      }

    } catch (error) {
      button.disabled = false;
      button.innerHTML = 'Send Enquiry <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

      alert('Sorry, there was a problem sending your enquiry. Please try again.');
    }
  });
}

});
