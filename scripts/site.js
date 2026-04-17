const navs = document.querySelectorAll('[data-site-nav]');

for (const nav of navs) {
  const toggle = nav.querySelector('[data-nav-toggle]');
  const menu = nav.querySelector('[data-nav-menu]');

  if (!toggle || !menu) {
    continue;
  }

  const closeMenu = () => {
    nav.dataset.open = 'false';
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.dataset.open === 'true';
    nav.dataset.open = isOpen ? 'false' : 'true';
    toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });

  menu.addEventListener('click', event => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 680) {
      closeMenu();
    }
  });
}