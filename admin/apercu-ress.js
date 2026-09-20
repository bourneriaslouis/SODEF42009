/* RESS — aperçu des articles et des brèves dans l'interface de rédaction.
   Reproduit la mise en page publiée (layouts ress-article.html et include ress-breve.html).
   À charger après apercu.js dans admin/index.html. */
(function () {
  var h = window.h;
  if (!window.RESS_APERCU_SANS_STYLE) CMS.registerPreviewStyle("../assets/ress/ress.css");
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

  function dateFr(v) {
    if (!v) return "—";
    var d;
    if (v instanceof Date) d = { a: v.getFullYear(), m: v.getMonth() + 1, j: v.getDate() };
    else { var r = String(v).match(/^(\d{4})-(\d{2})-(\d{2})/); if (!r) return "—"; d = { a: +r[1], m: +r[2], j: +r[3] }; }
    return [d.j === 1 ? h("span", { key: "j" }, "1", h("sup", {}, "er")) : String(d.j), " " + MOIS[d.m - 1] + " " + d.a];
  }
  function liste(v) { return v && v.toJS ? v.toJS() : (v || []); }
  function nomsAuteurs(auteurs, qualite) {
    var out = [];
    auteurs.forEach(function (a, i) {
      if (i > 0) out.push(i === auteurs.length - 1 ? " et " : ", ");
      out.push(h("span", { className: "auteur", key: "a" + i }, a.nom || "Nom de l’auteur",
        qualite && a.qualite ? h("span", { className: "qualite" }, ", " + a.qualite) : null));
    });
    return out;
  }
  var ApercuArticle = createClass({
    render: function () {
      var e = this.props.entry, get = function (k) { return e.getIn(["data", k]); };
      var auteurs = liste(get("auteurs")), mots = liste(get("mots_cles"));
      var numero = get("numero"), image = get("image"), pdf = get("pdf");
      var publie = get("published");
      return h("div", { className: "revue" },
        h("p", { className: "avertissement" }, h("strong", {}, publie ? "Publié sur le site." : "Non publié."),
          " État : " + (get("etat") || "—") + "."),
        h("header", { className: "ouverture-article" },
          h("div", { className: "enveloppe" },
            h("p", { className: "surtitre" }, "Articles"),
            h("h1", { className: "titre-article" }, get("title") || "Titre de l’article"),
            auteurs.length ? h("p", { className: "auteurs-article" }, nomsAuteurs(auteurs, true)) : null,
            h("p", { className: "meta-ress" },
              h("span", { className: "numero-ress" }, numero ? "N° " + numero : "Hors numéro"),
              h("span", {}, "Publié le ", h("time", {}, dateFr(get("date"))))))),
        h("div", { className: "section corps-article" },
          h("div", { className: "enveloppe article-actu" },
            get("resume") ? h("div", { className: "resume-article" },
              h("p", { className: "surtitre" }, "Résumé"), h("p", {}, get("resume")),
              mots.length ? h("p", { className: "mots-cles" }, h("span", { className: "surtitre" }, "Mots-clés"), " " + mots.join(" · ")) : null) : null,
            image ? h("figure", { className: "illustration" }, h("img", { src: this.props.getAsset(image).toString(), alt: get("image_alt") || "" })) : null,
            h("div", { className: "prose" }, this.props.widgetFor("body")),
            pdf ? h("p", { className: "actions" }, h("span", { className: "bouton bouton--document" }, "Télécharger l’article (PDF)")) : null)));
    }
  });

  var ApercuBreve = createClass({
    render: function () {
      var e = this.props.entry, get = function (k) { return e.getIn(["data", k]); };
      return h("div", { className: "revue section" },
        h("div", { className: "enveloppe colonne" },
          h("div", { className: "liste-breves" },
            h("article", { className: "breve" },
              h("p", { className: "meta-ress" }, h("time", {}, dateFr(get("date"))), get("auteur") ? h("span", {}, get("auteur")) : null),
              h("h3", {}, get("title") || "Titre de la brève"),
              h("div", { className: "prose texte-breve" }, this.props.widgetFor("body")),
              get("source_url") ? h("p", { className: "pied-breve" }, h("a", { className: "source", href: get("source_url") }, get("source_titre") || "Source")) : null))));
    }
  });

  CMS.registerPreviewTemplate("ress_articles", ApercuArticle);
  CMS.registerPreviewTemplate("ress_breves", ApercuBreve);
})();
