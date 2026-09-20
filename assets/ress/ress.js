/* RESS — filtres des listes (articles, brèves) et lien direct vers une brève */
(function () {
  var zone = document.querySelector('.filtres-ress');
  var liste = document.querySelector('[data-elements]');
  if (zone && liste) {
    var elements = Array.prototype.slice.call(liste.children).filter(function (e) { return e.tagName === 'ARTICLE'; });
    var boutons = zone.querySelectorAll('.filtre-ress');
    var choix = zone.querySelector('select[data-cle="numero"]');
    var compte = zone.querySelector('.compte-ress');
    var vide = document.querySelector('.aucun-resultat');
    var nom = zone.dataset.liste === 'breves' ? ['brève', 'brèves'] : ['article', 'articles'];
    var etat = { rubrique: 'toutes', numero: 'tous' };
    var params = new URLSearchParams(location.search);
    if (params.get('rubrique')) etat.rubrique = params.get('rubrique');
    if (params.get('numero') && choix) { etat.numero = params.get('numero'); choix.value = etat.numero; if (choix.value !== etat.numero) etat.numero = 'tous'; }
    function appliquer() {
      var n = 0;
      elements.forEach(function (e) {
        var ok = (etat.rubrique === 'toutes' || e.dataset.rubrique === etat.rubrique) &&
                 (etat.numero === 'tous' || e.dataset.numero === etat.numero);
        e.hidden = !ok;
        if (ok) { n++; e.classList.remove('attente'); }
      });
      boutons.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.valeur === etat.rubrique ? 'true' : 'false'); });
      if (compte) compte.textContent = n + ' ' + (n > 1 ? nom[1] : nom[0]);
      if (vide) vide.hidden = n > 0;
    }
    boutons.forEach(function (b) { b.addEventListener('click', function () { etat.rubrique = b.dataset.valeur; appliquer(); }); });
    if (choix) choix.addEventListener('change', function () { etat.numero = choix.value; appliquer(); });
    appliquer();
  }

  /* Brève ciblée par l'ancre (#…) : mise en évidence */
  function cibler() {
    if (!location.hash) return;
    var c = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!c || !c.classList.contains('breve')) return;
    if (c.hidden) { var t = document.querySelector('.filtre-ress[data-valeur="toutes"]'); if (t) t.click(); }
    c.classList.remove('attente');
    document.querySelectorAll('.breve.cible').forEach(function (b) { b.classList.remove('cible'); });
    c.classList.add('cible');
    c.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', cibler);
  cibler();

  /* « Lien vers cette brève » : copie l'adresse */
  document.querySelectorAll('[data-copier]').forEach(function (a) {
    a.addEventListener('click', function () {
      var url = location.href.split('#')[0] + a.getAttribute('href');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          var t = a.textContent; a.textContent = 'Lien copié'; setTimeout(function () { a.textContent = t; }, 1800);
        }, function () {});
      }
    });
  });
})();
