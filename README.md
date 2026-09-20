# Site de l'association Sorbonne Défense — version 5

Site statique construit par Jekyll sur GitHub Pages (aucun plugin). Page d'accueil : `index.html`.

- Pages Sorbonne Défense : `index.html`, `actualites.html`, `a-propos.html`, `contact.html`, `mentions-legales.html`
- Pages RESS (en-tête et pied propres à la revue) : `ress.html` (accueil de la revue), `ress-a-propos.html`, `ress-articles.html`, `ress-numeros.html` (numéros papier), `ress-contribuer.html`, `ress-breves.html`
- Gabarits : `_layouts/default.html`, `_layouts/actualite.html`, `_layouts/ress.html`, `_layouts/ress-article.html`
- Actualités : `_actualites/` ; RESS : `_ress_articles/` (publiés seulement si `published: true`), `_ress_breves/`, `_data/ress_numeros.yml`, `_data/ress_rubriques.yml`
- Interface de rédaction : `/admin` (Decap CMS + DecapBridge) ; `admin/config.yml` : bloc `backend` à remplacer par celui de DecapBridge
- Images et PDF déposés : `assets/uploads/actualites/`, `assets/uploads/ress/`
- Polices hébergées avec le site (`assets/fonts/`) : EB Garamond, Charis SIL, Spectral (titres de la RESS) — licence SIL Open Font License

Avant la mise en ligne : supprimer les contenus d'exemple (`exemple-*.md` et les 6 fichiers de `_actualites/`), compléter les champs surlignés « [À compléter] ».
