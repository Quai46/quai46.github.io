# quai46.github.io
Quai 46 — Genève. Vêtements minimalistes.

Site statique (HTML/CSS/JS, sans framework) publié sur GitHub Pages : https://quai46.github.io

## Structure
- `index.html` — Accueil (hero + liste d'attente)
- `collection.html` — Drop 01, 6 T-shirts
- `a-propos.html` — À propos
- `contact.html` — Contact
- `404.html` — page introuvable
- `css/style.css` — styles (mobile first)
- `js/main.js` — traduction FR/EN, menu, formulaires
- `images/` — visuels (placeholders SVG à remplacer)

## À personnaliser
- **Email** : remplacer `contact@quai46.ch` dans les 5 fichiers HTML.
- **Images** : remplacer les SVG de `images/` (même nom, ou changer l'extension dans le HTML) :
  `jet-deau.svg` (hero, format 4:5), `leman.svg` (À propos, 4:5), `tee-01.svg` … `tee-06.svg` (produits, 4:5).
- **Formulaires** : GitHub Pages ne reçoit pas de données. Créer un formulaire sur https://formspree.io
  et coller l'URL dans `WAITLIST_ENDPOINT` / `CONTACT_ENDPOINT` en haut de `js/main.js`.
  Sans cela, les formulaires affichent la confirmation sans rien envoyer (mode démo).
- **Textes anglais** : objet `EN` dans `js/main.js` (le français est dans le HTML).
