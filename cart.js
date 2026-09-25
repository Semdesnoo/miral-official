// Minimal shared cart: persists to localStorage, updates the header badge,
// and wires up [data-add-to-cart] buttons (bundle upsell, product CTAs).
(function () {
  const KEY = 'miral-cart';

  function readCart() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  }

  function writeCart(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadge();
  }

  function addToCart(name, price) {
    const items = readCart();
    items.push({ name, price, addedAt: Date.now() });
    writeCart(items);
  }

  function updateBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const count = readCart().length;
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateBadge();
    document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = btn.dataset.name || 'Product';
        const price = parseFloat(btn.dataset.price || '0');
        addToCart(name, price);
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="ph ph-check"></i> Toegevoegd';
        setTimeout(() => { btn.innerHTML = original; }, 1500);
      });
    });
  });
})();
