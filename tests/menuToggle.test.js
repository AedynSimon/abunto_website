const { JSDOM } = require('jsdom');
const { setupMobileMenu } = require('../scripts/main');

describe('Mobile menu toggle', () => {
  let dom;
  let menuBtn;
  let mobileMenu;

  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><button id="menu-btn" aria-expanded="false"></button><div id="mobile-menu" class="hidden"></div>`);
    const document = dom.window.document;
    menuBtn = document.getElementById('menu-btn');
    mobileMenu = document.getElementById('mobile-menu');
    setupMobileMenu(menuBtn, mobileMenu);
  });

  test('click toggles hidden class and aria-expanded', () => {
    expect(menuBtn.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.classList.contains('hidden')).toBe(true);

    menuBtn.dispatchEvent(new dom.window.Event('click', { bubbles: true }));

    expect(menuBtn.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.classList.contains('hidden')).toBe(false);

    menuBtn.dispatchEvent(new dom.window.Event('click', { bubbles: true }));

    expect(menuBtn.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.classList.contains('hidden')).toBe(true);
  });
});
