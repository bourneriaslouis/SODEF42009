/* Aperçu d'une actualité dans l'interface de rédaction : reproduit la page publiée. */
(function () {
  var h = window.h;
  var CATEGORIES = { conference: "Conférence", visite: "Visite", partenariat: "Partenariat", vie: "Vie de l’association" };
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

  function lireDate(v) {
    if (!v) return null;
    if (v instanceof Date) return v;
    var m = String(v).match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?/);
    return m ? { a: +m[1], mo: +m[2], j: +m[3], h: m[4] ? +m[4] : 0, mn: m[5] ? +m[5] : 0 } : null;
  }
  function dateFr(v, heure) {
    var d = lireDate(v);
    if (!d) return null;
    if (d instanceof Date) d = { a: d.getFullYear(), mo: d.getMonth() + 1, j: d.getDate(), h: d.getHours(), mn: d.getMinutes() };
    var jour = d.j === 1 ? [h("span", {}, "1"), h("sup", {}, "er")] : [String(d.j)];
    var txt = " " + MOIS[d.mo - 1] + " " + d.a;
    if (heure && (d.h || d.mn)) txt += ", " + d.h + " h" + (d.mn ? " " + String(d.mn).padStart(2, "0") : "");
    return jour.concat([txt]);
  }

  var Apercu = createClass({
    render: function () {
      var e = this.props.entry, get = function (k) { return e.getIn(["data", k]); };
      var asset = this.props.getAsset;
      var image = get("image"), pj = get("piece_jointe");
      var evDate = get("evenement_date"), evLieu = get("evenement_lieu"), auteur = get("auteur");
      var fiche = [];
      if (evDate) fiche.push(h("dt", { key: "dt1" }, "Date"), h("dd", { key: "dd1" }, dateFr(evDate, true)));
      if (evLieu) fiche.push(h("dt", { key: "dt2" }, "Lieu"), h("dd", { key: "dd2" }, evLieu));
      return h("div", {},
        h("section", { className: "ouverture bleu" },
          h("div", { className: "enveloppe" },
            h("p", { className: "surtitre" }, "Actualités · " + (CATEGORIES[get("categorie")] || "Catégorie à choisir")),
            h("h1", { className: "titre-actu" }, get("title") || "Titre de l’actualité"),
            h("p", { className: "meta meta--bleu" },
              "Publié le ", h("time", {}, dateFr(get("date")) || "—"),
              auteur ? h("span", {}, " · " + auteur) : null))),
        h("section", { className: "section" },
          h("div", { className: "enveloppe article-actu" },
            fiche.length ? h("dl", { className: "fiche fiche--evenement" }, fiche) : null,
            image ? h("figure", { className: "illustration" }, h("img", { src: asset(image).toString(), alt: get("image_alt") || "" })) : null,
            h("div", { className: "prose" }, this.props.widgetFor("body")),
            pj ? h("p", { className: "actions" }, h("span", { className: "bouton bouton--document" }, get("piece_jointe_titre") || "Télécharger le document")) : null)));
    }
  });
  CMS.registerPreviewTemplate("actualites", Apercu);
})();
