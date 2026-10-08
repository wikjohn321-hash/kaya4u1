(function () {
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');
  btn.addEventListener('click', function () {
    var open = nav.hasAttribute('hidden');
    nav.toggleAttribute('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
  });
  document.getElementById('yr').textContent = new Date().getFullYear();
})();
