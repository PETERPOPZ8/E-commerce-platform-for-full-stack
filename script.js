/* ===========================
   AcartZ – script.js
   =========================== */

// Wait for full DOM load
document.addEventListener('DOMContentLoaded', function () {

  // Badge transition
  var badge = document.getElementById('cartBadge');
  if (badge) badge.style.transition = 'transform 0.2s ease';

  // Block ALL clicks on the page from bubbling to any default behavior
  document.addEventListener('click', function (e) {
    // If somehow an anchor sneaks through, kill it
    var target = e.target;
    while (target && target !== document) {
      if (target.tagName === 'A') {
        e.preventDefault();
        return false;
      }
      target = target.parentNode;
    }
  });

});

// ---- Page Navigation ----
function showPage(page) {
  document.getElementById('productPage').classList.remove('active');
  document.getElementById('cartPage').classList.remove('active');

  if (page === 'product') {
    document.getElementById('productPage').classList.add('active');
  } else {
    document.getElementById('cartPage').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ---- Thumbnail Switch ----
function setMainImg(thumb) {
  document.querySelectorAll('.thumb').forEach(function (t) {
    t.classList.remove('active');
  });
  thumb.classList.add('active');
  var src = thumb.src.replace('w=80&h=80', 'w=420&h=380');
  document.getElementById('mainProductImg').src = src;
}

// ---- Product Quantity ----
var qty = 1;
function changeQty(delta) {
  qty = Math.max(1, qty + delta);
  document.getElementById('qtyDisplay').textContent = qty;
}

// ---- Color Swatch ----
function selectColor(el) {
  document.querySelectorAll('.color-section .swatch').forEach(function (s) {
    s.classList.remove('active');
  });
  el.classList.add('active');
}

// ---- Wishlist Toggle ----
function toggleWishlist() {
  var btn = document.getElementById('wishlistBtn');
  var icon = btn.querySelector('i');
  btn.classList.toggle('wishlisted');
  if (btn.classList.contains('wishlisted')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
    showToast('❤️ Added to Wishlist!');
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
    showToast('Removed from Wishlist');
  }
}

// ---- Add to Cart ----
function addToCart() {
  showToast('🛒 Added to Cart!');
  var badge = document.getElementById('cartBadge');
  var current = parseInt(badge.textContent) || 0;
  badge.textContent = current + 1;
  badge.style.transform = 'scale(1.4)';
  setTimeout(function () { badge.style.transform = 'scale(1)'; }, 300);
}

// ---- Cart Quantity ----
var cartQty = 1;
function changeCartQty(delta) {
  cartQty = Math.max(1, cartQty + delta);
  document.getElementById('cartQtyDisplay').textContent = cartQty;
  var base = 3489;
  var total = base * cartQty;
  document.querySelector('.cart-item-total').textContent =
    '₹' + total.toLocaleString('en-IN');
}

// ---- Remove Cart Item ----
function removeItem() {
  var cartItem = document.querySelector('.cart-item');
  if (!cartItem) return;
  cartItem.style.transition = 'all 0.3s ease';
  cartItem.style.opacity = '0';
  cartItem.style.transform = 'translateX(40px)';
  setTimeout(function () {
    cartItem.style.display = 'none';
    document.getElementById('cartBadge').textContent = '0';
    document.querySelector('.cart-count').textContent = '(0 items)';
    showToast('Item removed from cart');
  }, 320);
}

// ---- Toast ----
function showToast(msg) {
  var toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 2200);
}