/* Sorbonne Défense — comportements communs */
(function () {
  var doc = document.documentElement;
  doc.classList.add('js');
  var calme = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* En-tête qui se réduit au défilement */
  var entete = document.querySelector('.entete');
  function surDefilement() { if (entete) entete.classList.toggle('reduit', window.scrollY > 40); }
  window.addEventListener('scroll', surDefilement, { passive: true });
  surDefilement();

  /* Menu mobile */
  var bouton = document.querySelector('.bouton-menu');
  var nav = document.querySelector('.navigation');
  if (bouton && nav) {
    bouton.addEventListener('click', function () {
      var ouvert = nav.classList.toggle('ouverte');
      bouton.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
    });
  }

  /* Apparition au défilement : seuls les blocs situés sous la ligne de flottaison sont concernés */
  if (!calme && 'IntersectionObserver' in window) {
    var hauteur = window.innerHeight;
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.remove('attente'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.revele').forEach(function (el, i) {
      if (el.getBoundingClientRect().top > hauteur) {
        el.classList.add('attente');
        el.style.transitionDelay = ((i % 3) * 70) + 'ms';
        obs.observe(el);
      }
    });
  }

  /* Page Actualités : filtre par catégorie */
  var filtres = document.querySelectorAll('.filtre');
  var actus = document.querySelectorAll('.actu');
  var compte = document.querySelector('.compte');
  function filtrer(cat) {
    var n = 0;
    actus.forEach(function (a) {
      var visible = cat === 'toutes' || a.dataset.categorie === cat;
      a.hidden = !visible;
      if (visible) { n++; a.classList.remove('attente'); }
    });
    filtres.forEach(function (f) { f.setAttribute('aria-pressed', f.dataset.filtre === cat ? 'true' : 'false'); });
    if (compte) compte.textContent = n + (n > 1 ? ' actualités' : ' actualité');
  }
  filtres.forEach(function (f) { f.addEventListener('click', function () { filtrer(f.dataset.filtre); }); });
  if (filtres.length) filtrer('toutes');

  /* Ancres (#…) : faire apparaître immédiatement le bloc ciblé */
  function ouvrirCible() {
    if (!location.hash) return;
    var cible = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!cible) return;
    cible.classList.remove('attente');
    cible.querySelectorAll('.attente').forEach(function (e) { e.classList.remove('attente'); });
  }
  window.addEventListener('hashchange', ouvrirCible);
  ouvrirCible();
})();
