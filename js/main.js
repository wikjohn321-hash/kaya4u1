(function () {
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');
  btn.addEventListener('click', function () {
    var open = nav.hasAttribute('hidden');
    nav.toggleAttribute('hidden', !open);
    btn.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', function () {
    nav.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', 'false');
  });

  var tabs = document.querySelectorAll('.tab');
  var cards = document.querySelectorAll('.card');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) {
        x.classList.toggle('active', x === t);
        x.setAttribute('aria-selected', String(x === t));
      });
      var cat = t.dataset.cat;
      cards.forEach(function (c) { c.hidden = cat !== 'all' && c.dataset.cat !== cat; });
    });
  });

  var track = document.getElementById('slides');
  var slides = track.children;
  var dots = document.getElementById('dots');
  var cur = 0, timer;
  function go(i) {
    cur = (i + slides.length) % slides.length;
    track.scrollTo({ left: cur * track.clientWidth, behavior: 'smooth' });
  }
  function mark() {
    var i = Math.round(track.scrollLeft / track.clientWidth);
    cur = i;
    Array.prototype.forEach.call(dots.children, function (d, n) { d.classList.toggle('on', n === i); });
  }
  Array.prototype.forEach.call(slides, function (s, n) {
    var d = document.createElement('button');
    d.setAttribute('aria-label', 'Go to slide ' + (n + 1));
    d.addEventListener('click', function () { go(n); restart(); });
    dots.appendChild(d);
  });
  function restart() {
    clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(function () { go(cur + 1); }, 5000);
    }
  }
  track.addEventListener('scroll', mark, { passive: true });
  track.addEventListener('touchstart', function () { clearInterval(timer); }, { passive: true });
  track.addEventListener('touchend', restart, { passive: true });
  document.getElementById('sl-prev').addEventListener('click', function () { go(cur - 1); restart(); });
  document.getElementById('sl-next').addEventListener('click', function () { go(cur + 1); restart(); });
  if (slides.length < 2) { document.getElementById('slider').classList.add('single'); }
  else { mark(); restart(); }

  var wins = document.getElementById('wins-list');
  Array.prototype.slice.call(wins.children).forEach(function (li) {
    var c = li.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    wins.appendChild(c);
  });

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
