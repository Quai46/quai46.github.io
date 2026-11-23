# Informe — mejoras web QUAI 46

Rama: `mejoras-web` (un commit por tarea). `main` no se ha tocado.
Todo el texto visible de la web sigue en francés (y en inglés en `/en/`); este informe está en español.

---

## (a) Cambios por tarea

### 1. Lectura del repositorio
Sin commit (solo lectura). Antes: 5 páginas HTML, `css/style.css`, `js/main.js` (el inglés se cambiaba por JavaScript con un diccionario), SVG en `/images`, `favicon.svg`.

### 2. Erratas y etiquetas `<head>` — commit `d501a37`
- Hero: el texto era «QUAI 46— Genève» (faltaba el espacio). Ahora es «QUAI 46 — Genève», con el mismo aspecto visual (Genève en la línea de abajo).
- Pie de página: «© 2026 QUAI 46» a la izquierda y «Genève · Tous droits réservés» a la derecha.
- Revisados en todas las páginas: `lang="fr"`, `<title>` único, meta description, canonical y Open Graph.
- Favicons: además de `favicon.svg`, ahora hay `favicon.ico` (navegadores antiguos) y `apple-touch-icon.png` (iPhone).
- Rutas absolutas (`/css/…`), para que las páginas de `/en/` funcionen. Los estilos inline pasan a clases CSS.
- Se retira el cambio de idioma por JavaScript. En la tarea 7 se sustituye por páginas reales en inglés.

### 3. Imagen para redes sociales — commit `4442cb6`
- `assets/og-image.png`: 1200×630 px, 24 KB, con la marca y la ilustración del Jet d'Eau.
- En todas las páginas: `og:image` + `og:image:width`/`height`/`alt`, `twitter:card=summary_large_image`, `twitter:title`/`description`/`image`.

### 4. Formulario de lista de espera con Formspree — commit `b00ba2d`
- `action="https://formspree.io/f/FORMSPREE_ID"`, en el inicio, en Collection (#liste) y en Contact.
- Email obligatorio y validado. Casilla de consentimiento obligatoria con enlace a la política de privacidad. Honeypot `_gotcha` contra el spam.
- Se envía con `fetch`, sin recargar la página. El mensaje de éxito o de error aparece en una zona `aria-live`.
- Cada error va ligado a su campo (`aria-invalid` + `aria-describedby`) y el foco salta al primer campo con error.
- Sin JavaScript, el formulario se envía igualmente a Formspree.
- Mientras `FORMSPREE_ID` no se sustituya, el formulario dice que aún no está activado. No finge un éxito falso.
- Probado con Playwright: errores, email inválido, éxito, error del servidor y honeypot (este no envía nada).

### 5. Páginas legales — commit `2aba7cb`
- `mentions-legales.html`: impressum suizo con titular, dirección, IDE, TVA y responsable (todo en TODO), alojamiento en GitHub, propiedad intelectual, responsabilidad, enlaces externos y derecho aplicable.
- `confidentialite.html`: nLPD + RGPD. Sin cookies ni analítica. Detalla los datos y sus bases legales, Formspree, GitHub Pages y el proveedor de email (TODO), las transferencias a EE. UU. (DPF o cláusulas tipo) y los plazos de conservación:
  - lista de espera: hasta la baja, y como máximo 24 meses
  - mensajes de contacto: 12 meses
  - copias en Formspree: purga mensual

  También explica cómo pedir que se borren los datos (email con el asunto «Suppression de mes données», respuesta en 30 días como máximo) y cómo reclamar ante el PFPDT.
- `cgv.html`: precios en CHF, pedido, pago, envío, devolución en 14 días (voluntaria: el derecho suizo no la impone), garantía legal de 2 años (art. 197 y ss. CO), responsabilidad, derecho suizo sin CVIM y tribunal de Ginebra, con la salvedad del art. 32 CPC para consumidores.
- Columna «Informations» en el pie de todas las páginas, con enlaces a las tres páginas.
- **Fuentes autoalojadas** en `/assets/fonts` (Cormorant Garamond e Inter, licencia OFL incluida). Ya no se hacen peticiones a Google Fonts: así no se transmite la IP de los visitantes a Google (punto sensible según el RGPD) y la web carga más rápido.

### 6. Página Collection, Drop 01 — commit `a6c733e`
- 6 camisetas: 2 cortes × 3 colores. *Decisión mía* (TODO): la petición no especificaba los modelos.
  - Corte recto, 220 g/m²: **Léman** (blanc cassé), **Pâquis** (noir), **Molard** (gris pierre).
  - Corte estructurado, 280 g/m²: **Jet d'Eau** (blanc cassé), **Bise** (noir), **Salève** (gris pierre).
- Ficha de cada producto: número (N° 01…06) y «Édition numérotée», precio en CHF (TODO), tallas XS a XL, algodón orgánico con gramaje (TODO), origen (TODO), número de ejemplares (TODO) y botón «Rejoindre la liste», que lleva al formulario #liste.
- Fotos: huecos en `/assets/products/`, por ahora con ilustraciones de camisetas en las tres tonalidades. Lazy loading, `alt` descriptivo y un `README.md` con los formatos esperados. Se borran los antiguos `images/tee-0*.svg`.
- Guía de tallas en dos tablas accesibles (`caption`, `th scope`), una por corte. Las medidas son orientativas (TODO).
- Sección «Livraison & retours» enlazada a las CGV.

### 7. Versión en inglés en `/en/` — commit `4aaaf9e`
- 7 páginas con traducción natural: `/en/`, `collection.html`, `about.html`, `contact.html`, `legal-notice.html`, `privacy.html` y `terms.html`.
- El botón FR/EN es ahora un enlace a la página equivalente en el otro idioma. Probado en las 7 páginas, en los dos sentidos.
- `hreflang` fr / en / x-default (x-default = francés) y `og:locale:alternate`.
- Los formularios y sus mensajes también están en inglés.

### 8. sitemap.xml, robots.txt y 404 — commit `a4c80d7`
- `sitemap.xml` con 14 URL (FR + EN) y sus alternativas hreflang. XML validado.
- `robots.txt` lo permite todo y apunta al sitemap.
- `404.html` bilingüe, con el estilo de la marca y la ilustración del Jet d'Eau. Enlaza al inicio, a Collection y a la versión inglesa. Lleva `noindex` y responde con código 404.

### 9. Revisión final — commit `3b52987`
- **Enlaces**: 0 enlaces internos rotos en las 14 páginas enlazadas (anclas incluidas). Los enlaces externos (Instagram, TikTok, Formspree, GitHub, PFPDT) no se han podido comprobar desde el entorno de trabajo.
- **Consola**: 0 errores y 0 avisos en todas las páginas.
- **Accesibilidad**: axe-core (WCAG 2.1 AA + buenas prácticas) da 0 infracciones en 15 páginas a 375 px y a 1440 px. Encabezados en orden (un `h1` por página, sin saltos de nivel) y `alt` en todas las imágenes.
- **Contraste**: el gris piedra del texto `#8a8780` daba 3,26:1 y no cumplía AA. Pasa a `#6c6964` (4,97:1): mismo tono, un poco más intenso. Para volver al anterior, basta cambiar `--stone` en `css/style.css`, pero entonces dejaría de cumplir AA.
- **Corrección de una regresión de la tarea 2**: en escritorio quedaba demasiado espacio bajo los títulos de página.
- **Móvil (375 px) y escritorio (1440 px)**: revisados con capturas, sin scroll horizontal.
- **Peso**: el inicio en móvil hace 8 peticiones y pesa 152 KB sin comprimir (fuentes incluidas). Todas las imágenes y fuentes juntas suman 184 KB.

---

## (b) Lista completa de TODO

Todos los TODO son comentarios HTML `<!-- TODO: … -->`, así que no se ven en la web. La excepción es `js/main.js`, que usa `// TODO`. En las páginas legales, los datos que faltan se muestran además entre corchetes grises, por ejemplo «[Raison sociale]», para que no pasen desapercibidos.

### Resumen por tema
| Tema | Dónde |
|---|---|
| Identificador Formspree (`FORMSPREE_ID`) | `index.html`, `collection.html`, `contact.html` y sus equivalentes en `en/` |
| Email definitivo (sustituir `contact@quai46.ch`) | pie de las 15 páginas + `js/main.js` (mensajes de los formularios). Lo más rápido es buscar y reemplazar en todo el proyecto |
| Titular, forma jurídica, dirección, IDE, registro mercantil, TVA, responsable | `mentions-legales.html`, `confidentialite.html`, `en/legal-notice.html`, `en/privacy.html` |
| Datos de privacidad: proveedor de email, certificación DPF, representante UE, purga de Formspree, 2FA | `confidentialite.html`, `en/privacy.html` |
| CGV: TVA, medios de pago, envío, gastos de devolución | `cgv.html`, `en/terms.html` |
| Productos: precio, composición/gramaje, origen, nº de ejemplares, foto (× 6) | `collection.html`, `en/collection.html` |
| Temporada del drop, medidas de la guía de tallas, envío | `collection.html`, `en/collection.html` |
| Ilustraciones: Jet d'Eau (inicio) y Léman (À propos); talleres | `index.html`, `a-propos.html` y sus equivalentes en `en/` |

### Lista detallada (archivo:línea | qué falta)

**404.html** (1)

- `404.html:95` — remplacer par l'adresse email définitive

**a-propos.html** (3)

- `a-propos.html:70` — remplacer par une illustration ou photo du Léman, format 4:5, ex. /images/leman.jpg
- `a-propos.html:80` — confirmer le pays et les ateliers de production
- `a-propos.html:114` — remplacer par l'adresse email définitive

**cgv.html** (5)

- `cgv.html:77` — préciser « TVA incluse » ou « non assujetti à la TVA » selon votre situation
- `cgv.html:83` — confirmer les moyens de paiement et le prestataire (ex. Stripe, Payrexx, SumUp)
- `cgv.html:86` — confirmer les pays desservis, le transporteur, les délais et les frais de livraison
- `cgv.html:95` — confirmer qui paie les frais de retour
- `cgv.html:131` — remplacer par l'adresse email définitive

**collection.html** (35)

- `collection.html:60` — confirmer la saison / date du drop
- `collection.html:71` — photo produit — remplacer par /assets/products/leman.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `collection.html:77` — confirmer le prix de Léman
- `collection.html:81` — confirmer composition, certification (GOTS ?) et grammage
- `collection.html:82` — confirmer le pays de confection
- `collection.html:83` — confirmer le nombre d'exemplaires
- `collection.html:90` — photo produit — remplacer par /assets/products/paquis.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `collection.html:96` — confirmer le prix de Pâquis
- `collection.html:100` — confirmer composition, certification (GOTS ?) et grammage
- `collection.html:101` — confirmer le pays de confection
- `collection.html:102` — confirmer le nombre d'exemplaires
- `collection.html:109` — photo produit — remplacer par /assets/products/molard.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `collection.html:115` — confirmer le prix de Molard
- `collection.html:119` — confirmer composition, certification (GOTS ?) et grammage
- `collection.html:120` — confirmer le pays de confection
- `collection.html:121` — confirmer le nombre d'exemplaires
- `collection.html:128` — photo produit — remplacer par /assets/products/jet-deau.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `collection.html:134` — confirmer le prix de Jet d’Eau
- `collection.html:138` — confirmer composition, certification (GOTS ?) et grammage
- `collection.html:139` — confirmer le pays de confection
- `collection.html:140` — confirmer le nombre d'exemplaires
- `collection.html:147` — photo produit — remplacer par /assets/products/bise.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `collection.html:153` — confirmer le prix de Bise
- `collection.html:157` — confirmer composition, certification (GOTS ?) et grammage
- `collection.html:158` — confirmer le pays de confection
- `collection.html:159` — confirmer le nombre d'exemplaires
- `collection.html:166` — photo produit — remplacer par /assets/products/saleve.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `collection.html:172` — confirmer le prix de Salève
- `collection.html:176` — confirmer composition, certification (GOTS ?) et grammage
- `collection.html:177` — confirmer le pays de confection
- `collection.html:178` — confirmer le nombre d'exemplaires
- `collection.html:194` — remplacer par les mesures réelles du fabricant
- `collection.html:222` — confirmer zones, délais et frais (identiques aux CGV)
- `collection.html:239` — remplacer FORMSPREE_ID par l'identifiant du formulaire Formspree (ex. « xyzabcd ») — voir INFORME.md
- `collection.html:281` — remplacer par l'adresse email définitive

**confidentialite.html** (8)

- `confidentialite.html:74` — raison sociale ou nom et prénom du titulaire, et forme juridique (entreprise individuelle, Sàrl, SA…)
- `confidentialite.html:75` — adresse postale complète
- `confidentialite.html:77` — vérifier avec un juriste si un représentant dans l'UE (art. 27 RGPD) doit être désigné
- `confidentialite.html:92` — nommer le fournisseur de messagerie (ex. Infomaniak, Proton, Google Workspace) et son pays
- `confidentialite.html:94` — vérifier la certification Data Privacy Framework de Formspree et de GitHub sur www.dataprivacyframework.gov
- `confidentialite.html:101` — confirmer cette routine de suppression
- `confidentialite.html:111` — activer l'authentification à deux facteurs sur ces comptes
- `confidentialite.html:138` — remplacer par l'adresse email définitive

**contact.html** (2)

- `contact.html:75` — remplacer FORMSPREE_ID (le même formulaire Formspree peut servir, le champ « formulaire » distingue les envois)
- `contact.html:118` — remplacer par l'adresse email définitive

**index.html** (3)

- `index.html:66` — remplacer FORMSPREE_ID par l'identifiant du formulaire Formspree (ex. « xyzabcd ») — voir INFORME.md
- `index.html:90` — remplacer par l'illustration du Jet d'Eau (fusain ou stylo-plume), format 4:5, ex. /images/jet-deau.jpg
- `index.html:148` — remplacer par l'adresse email définitive

**mentions-legales.html** (8)

- `mentions-legales.html:71` — raison sociale ou nom et prénom du titulaire, et forme juridique (entreprise individuelle, Sàrl, SA…)
- `mentions-legales.html:72` — adresse postale complète
- `mentions-legales.html:76` — forme juridique
- `mentions-legales.html:77` — numéro IDE (www.uid.admin.ch)
- `mentions-legales.html:78` — confirmer l'inscription au registre du commerce, ou supprimer cette ligne
- `mentions-legales.html:79` — numéro TVA si assujetti (chiffre d'affaires > CHF 100 000), sinon indiquer « non assujetti »
- `mentions-legales.html:80` — nom de la personne responsable du contenu
- `mentions-legales.html:120` — remplacer par l'adresse email définitive

**js/main.js** (1)

- `js/main.js:85` — si l'adresse email change, la mettre à jour dans les messages ci-dessus.

**en/about.html** (3)

- `en/about.html:70` — remplacer par une illustration ou photo du Léman, format 4:5, ex. /images/leman.jpg
- `en/about.html:80` — confirmer le pays et les ateliers de production
- `en/about.html:114` — remplacer par l'adresse email définitive

**en/collection.html** (35)

- `en/collection.html:60` — confirmer la saison / date du drop
- `en/collection.html:71` — photo produit — remplacer par /assets/products/leman.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `en/collection.html:77` — confirmer le prix de Léman
- `en/collection.html:81` — confirmer composition, certification (GOTS ?) et grammage
- `en/collection.html:82` — confirmer le pays de confection
- `en/collection.html:83` — confirmer le nombre d'exemplaires
- `en/collection.html:90` — photo produit — remplacer par /assets/products/paquis.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `en/collection.html:96` — confirmer le prix de Pâquis
- `en/collection.html:100` — confirmer composition, certification (GOTS ?) et grammage
- `en/collection.html:101` — confirmer le pays de confection
- `en/collection.html:102` — confirmer le nombre d'exemplaires
- `en/collection.html:109` — photo produit — remplacer par /assets/products/molard.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `en/collection.html:115` — confirmer le prix de Molard
- `en/collection.html:119` — confirmer composition, certification (GOTS ?) et grammage
- `en/collection.html:120` — confirmer le pays de confection
- `en/collection.html:121` — confirmer le nombre d'exemplaires
- `en/collection.html:128` — photo produit — remplacer par /assets/products/jet-deau.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `en/collection.html:134` — confirmer le prix de Jet d’Eau
- `en/collection.html:138` — confirmer composition, certification (GOTS ?) et grammage
- `en/collection.html:139` — confirmer le pays de confection
- `en/collection.html:140` — confirmer le nombre d'exemplaires
- `en/collection.html:147` — photo produit — remplacer par /assets/products/bise.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `en/collection.html:153` — confirmer le prix de Bise
- `en/collection.html:157` — confirmer composition, certification (GOTS ?) et grammage
- `en/collection.html:158` — confirmer le pays de confection
- `en/collection.html:159` — confirmer le nombre d'exemplaires
- `en/collection.html:166` — photo produit — remplacer par /assets/products/saleve.jpg (4:5, ex. 1600×2000, < 250 Ko)
- `en/collection.html:172` — confirmer le prix de Salève
- `en/collection.html:176` — confirmer composition, certification (GOTS ?) et grammage
- `en/collection.html:177` — confirmer le pays de confection
- `en/collection.html:178` — confirmer le nombre d'exemplaires
- `en/collection.html:194` — remplacer par les mesures réelles du fabricant
- `en/collection.html:222` — confirmer zones, délais et frais (identiques aux CGV)
- `en/collection.html:239` — remplacer FORMSPREE_ID par l'identifiant du formulaire Formspree (ex. « xyzabcd ») — voir INFORME.md
- `en/collection.html:281` — remplacer par l'adresse email définitive

**en/contact.html** (2)

- `en/contact.html:75` — remplacer FORMSPREE_ID (le même formulaire Formspree peut servir, le champ « formulaire » distingue les envois)
- `en/contact.html:118` — remplacer par l'adresse email définitive

**en/index.html** (3)

- `en/index.html:66` — remplacer FORMSPREE_ID par l'identifiant du formulaire Formspree (ex. « xyzabcd ») — voir INFORME.md
- `en/index.html:90` — remplacer par l'illustration du Jet d'Eau (fusain ou stylo-plume), format 4:5, ex. /images/jet-deau.jpg
- `en/index.html:148` — remplacer par l'adresse email définitive

**en/legal-notice.html** (8)

- `en/legal-notice.html:71` — raison sociale ou nom et prénom du titulaire, et forme juridique (entreprise individuelle, Sàrl, SA…)
- `en/legal-notice.html:72` — adresse postale complète
- `en/legal-notice.html:76` — forme juridique
- `en/legal-notice.html:77` — numéro IDE (www.uid.admin.ch)
- `en/legal-notice.html:78` — confirmer l'inscription au registre du commerce, ou supprimer cette ligne
- `en/legal-notice.html:79` — numéro TVA si assujetti (chiffre d'affaires > CHF 100 000), sinon indiquer « non assujetti »
- `en/legal-notice.html:80` — nom de la personne responsable du contenu
- `en/legal-notice.html:120` — remplacer par l'adresse email définitive

**en/privacy.html** (8)

- `en/privacy.html:74` — raison sociale ou nom et prénom du titulaire, et forme juridique (entreprise individuelle, Sàrl, SA…)
- `en/privacy.html:75` — adresse postale complète
- `en/privacy.html:77` — vérifier avec un juriste si un représentant dans l'UE (art. 27 RGPD) doit être désigné
- `en/privacy.html:92` — name the email provider and its country
- `en/privacy.html:94` — check the Data Privacy Framework certification of Formspree and GitHub on www.dataprivacyframework.gov
- `en/privacy.html:101` — confirm this deletion routine
- `en/privacy.html:111` — enable two-factor authentication on these accounts
- `en/privacy.html:138` — remplacer par l'adresse email définitive

**en/terms.html** (5)

- `en/terms.html:77` — state “VAT included” or “not subject to VAT” as applicable
- `en/terms.html:83` — confirm payment methods and provider
- `en/terms.html:86` — confirm countries, carrier, lead times and delivery costs
- `en/terms.html:95` — confirm who pays return shipping
- `en/terms.html:131` — remplacer par l'adresse email définitive

Total: 130 TODO.

---

## (c) Pasos pendientes

1. **Crear la cuenta de Formspree** (el plan gratuito basta para empezar: 50 envíos al mes).
   - Entra en https://formspree.io, crea un formulario y copia su identificador: la parte final de `https://formspree.io/f/xxxxxxx`.
   - Sustituye `FORMSPREE_ID` por ese identificador en los 6 archivos: `index.html`, `collection.html`, `contact.html` y sus equivalentes en `en/`. Con buscar y reemplazar en todo el proyecto es un solo paso.
   - En Formspree, activa la protección anti-spam y, si quieres, la confirmación por email. Pon como destinatario el email definitivo.
   - Prueba el formulario una vez publicado: el primer envío pide confirmar el email del dueño de la cuenta.
2. **Hacer revisar los textos legales a un profesional** (abogado o fiduciaria suiza): mentions légales, confidentialité y CGV. Puntos a validar en especial:
   - si hace falta un representante en la UE
   - el estado de la TVA
   - la política de devoluciones y quién paga el envío de vuelta
   - la certificación DPF de Formspree y GitHub
3. **Completar los TODO** de la sección (b): titular, dirección, IDE, precios, composición, origen, medidas y email definitivo.
4. **Subir las fotos**:
   - Productos: JPEG o WebP en formato 4:5 (por ejemplo 1600×2000) y de menos de 250 KB, en `/assets/products/`. Después cambia el `src` de cada producto en `collection.html` y `en/collection.html` (detalles en `assets/products/README.md`).
   - Ilustraciones: el Jet d'Eau a carbón o estilográfica en `/images/` (en `index.html` y `en/index.html`) y el Léman (en `a-propos.html` y `en/about.html`).
   - Cuando tengas la ilustración definitiva, conviene regenerar también `assets/og-image.png`.
5. **Fusionar el Pull Request** `mejoras-web` → `main` en GitHub. GitHub Pages publica sola en uno o dos minutos. Después:
   - comprueba https://quai46.github.io y https://quai46.github.io/en/
   - (opcional) añade la web a Google Search Console y envía `https://quai46.github.io/sitemap.xml`
   - prueba la vista previa para redes en https://www.opengraph.xyz
6. **Otras recomendaciones**:
   - activa la verificación en dos pasos en GitHub, Formspree y el correo (la política de privacidad lo afirma)
   - si compras un dominio propio (`quai46.ch`), habrá que cambiar `https://quai46.github.io` en las etiquetas canonical, og y hreflang y en `sitemap.xml`

### Nota técnica
Las páginas HTML se generan con un script Python que mantiene FR y EN sincronizados, pero ese script no forma parte del repositorio. **El HTML es la fuente de verdad**: edita los archivos `.html` directamente y recuerda aplicar cada cambio también en su equivalente de `/en/`.
