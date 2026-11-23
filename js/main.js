/* QUAI 46 — Genève · main.js (sans dépendances) */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     CONFIGURATION
     Les formulaires ont besoin d'un service externe pour recevoir les
     données (GitHub Pages est statique). Créez un formulaire gratuit sur
     https://formspree.io et collez ici l'URL fournie, par exemple :
     "https://formspree.io/f/abcdwxyz"
     Tant que c'est vide, le formulaire affiche le message de confirmation
     sans rien envoyer (mode démonstration).
     ------------------------------------------------------------------ */
  var WAITLIST_ENDPOINT = "";
  var CONTACT_ENDPOINT = "";

  var doc = document.documentElement;
  doc.classList.add("js");

  /* ------------------------------------------------------------------
     TRADUCTIONS — le français est dans le HTML, l'anglais ici.
     ------------------------------------------------------------------ */
  var EN = {
    "meta.title.home": "QUAI 46 — Genève · Minimalist clothing",
    "meta.title.collection": "Collection — QUAI 46",
    "meta.title.about": "About — QUAI 46",
    "meta.title.contact": "Contact — QUAI 46",
    "meta.title.404": "Page not found — QUAI 46",

    "skip": "Skip to content",
    "nav.home": "Home",
    "nav.collection": "Collection",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.menu": "Menu",

    "home.eyebrow": "Minimalist clothing · Est. Geneva",
    "home.tagline": "Essential garments, cut with Swiss precision. Nothing superfluous — only what lasts.",
    "home.waitlist.label": "First drop — waiting list",
    "home.waitlist.placeholder": "Your email address",
    "home.waitlist.cta": "Join",
    "home.waitlist.note": "Be the first to know. No spam, ever.",
    "home.visual.caption": "Jet d'Eau — charcoal study",

    "home.statement.eyebrow": "The house",
    "home.statement.title": "The quiet of the lake, the rigour of the watchmaker.",
    "home.statement.text": "QUAI 46 was born on the shores of Lake Geneva. We design few pieces, but each one is thought through to the millimetre: noble materials, clean lines, an exact fit.",
    "home.pillar1.title": "Materials",
    "home.pillar1.text": "Heavyweight organic cotton, chosen for its hand and longevity.",
    "home.pillar2.title": "Cut",
    "home.pillar2.text": "Precise proportions, designed to fall right — wash after wash.",
    "home.pillar3.title": "Restraint",
    "home.pillar3.text": "Small, numbered drops. No sales, no excess.",
    "home.collection.eyebrow": "Drop 01",
    "home.collection.title": "Six essentials.",
    "home.collection.text": "A first collection of T-shirts in off-white, black and stone grey. Available soon.",
    "home.collection.cta": "Discover the collection",

    "collection.eyebrow": "Drop 01 — Winter 2026",
    "collection.title": "Collection",
    "collection.intro": "Six T-shirts, three colours, one standard: the essential, perfectly executed. Designed in Geneva.",
    "product.soon": "Coming soon",
    "product.meta.1": "Organic cotton 240 g · Off-white",
    "product.meta.2": "Organic cotton 240 g · White",
    "product.meta.3": "Organic cotton 240 g · Black",
    "product.meta.4": "Organic cotton 260 g · Stone grey",
    "product.meta.5": "Organic cotton 260 g · Charcoal",
    "product.meta.6": "Pima cotton 200 g · Ecru",
    "collection.notify": "Want to be notified when the drop opens?",
    "collection.notify.cta": "Join the list",

    "about.eyebrow": "About",
    "about.title": "Geneva, Quai 46.",
    "about.intro": "A clothing house born from a simple idea: fewer pieces, better made.",
    "about.h1": "Origin",
    "about.p1": "Everything starts at the water's edge. Between the Jet d'Eau and the Alps, Geneva cultivates a discreet elegance — one that never needs to raise its voice. QUAI 46 draws on this restraint to design garments that are sober, precise and timeless.",
    "about.h2": "Our approach",
    "about.p2": "Inspired by Swiss design — clear grids, functional typography, a love of detail — we work on proportions, materials and finishes until nothing more can be removed.",
    "about.p3": "Each drop is produced in limited quantities, with partner workshops in Europe chosen for their know-how and working conditions.",
    "about.quote": "“Simplicity is not an absence. It is the result of a thousand decisions.”",
    "about.quote.cite": "The founders",
    "about.visual.caption": "Lake Geneva — fountain pen study",

    "contact.eyebrow": "Contact",
    "contact.title": "Write to us.",
    "contact.intro": "A question, a collaboration, a press request? We will reply within 48 hours.",
    "contact.email": "Email",
    "contact.studio": "Studio",
    "contact.studio.value": "Geneva, Switzerland",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.send": "Send",

    "footer.tagline": "Minimalist clothing. Designed in Geneva.",
    "footer.follow": "Follow",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",

    "form.success": "Thank you. You are on the list.",
    "form.sent": "Thank you. Your message has been sent.",
    "form.error": "Something went wrong. Please try again.",
    "form.invalid": "Please enter a valid email address.",

    "404.title": "This page has drifted out onto the lake.",
    "404.cta": "Back to home"
  };

  var FR_MSG = {
    "form.success": "Merci. Vous êtes sur la liste.",
    "form.sent": "Merci. Votre message a bien été envoyé.",
    "form.error": "Une erreur est survenue. Veuillez réessayer.",
    "form.invalid": "Veuillez saisir une adresse email valide."
  };

  var STORAGE_KEY = "quai46-lang";
  var FR = {}; // rempli depuis le HTML au chargement
  var current = "fr";

  function store(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* mode privé */ }
  }
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function captureFrench() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      FR[el.getAttribute("data-i18n")] = el.innerHTML;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      FR[el.getAttribute("data-i18n-placeholder")] = el.getAttribute("placeholder");
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      FR[el.getAttribute("data-i18n-aria")] = el.getAttribute("aria-label");
    });
    var t = doc.getAttribute("data-title");
    if (t) FR[t] = document.title;
    for (var k in FR_MSG) FR[k] = FR_MSG[k];
  }

  function t(key) {
    var dict = current === "en" ? EN : FR;
    return dict[key] != null ? dict[key] : FR[key];
  }

  function applyLang(lang) {
    current = lang === "en" ? "en" : "fr";
    doc.lang = current;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n"));
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-placeholder"));
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var v = t(el.getAttribute("data-i18n-aria"));
      if (v != null) el.setAttribute("aria-label", v);
    });
    var titleKey = doc.getAttribute("data-title");
    if (titleKey && t(titleKey)) document.title = t(titleKey);

    document.querySelectorAll(".lang-toggle").forEach(function (btn) {
      btn.querySelectorAll("[data-lang]").forEach(function (s) {
        s.setAttribute("aria-current", s.getAttribute("data-lang") === current ? "true" : "false");
      });
      btn.setAttribute("aria-label", current === "fr" ? "Switch to English" : "Passer en français");
    });
  }

  captureFrench();
  var saved = read(STORAGE_KEY);
  applyLang(saved || "fr");

  document.querySelectorAll(".lang-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = current === "fr" ? "en" : "fr";
      store(STORAGE_KEY, next);
      applyLang(next);
    });
  });

  /* ------------------------------------------------------------------
     MENU MOBILE
     ------------------------------------------------------------------ */
  var menuBtn = document.querySelector(".menu-toggle");
  if (menuBtn) {
    var closeMenu = function () {
      document.body.classList.remove("menu-open");
      menuBtn.setAttribute("aria-expanded", "false");
    };
    menuBtn.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ------------------------------------------------------------------
     HEADER AU SCROLL
     ------------------------------------------------------------------ */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------
     APPARITION AU SCROLL
     ------------------------------------------------------------------ */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ------------------------------------------------------------------
     FORMULAIRES
     ------------------------------------------------------------------ */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleForm(form, endpoint, successKey) {
    var note = form.querySelector(".form-note");
    var btn = form.querySelector("button[type=submit]");

    function say(key, ok) {
      if (!note) return;
      note.removeAttribute("data-i18n");
      note.textContent = t(key);
      note.classList.toggle("is-success", !!ok);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.querySelector("[name=_gotcha]") && form.querySelector("[name=_gotcha]").value) return;
      var email = form.querySelector("[type=email]");
      if (email && !EMAIL_RE.test(email.value.trim())) {
        say("form.invalid", false);
        email.focus();
        return;
      }

      var done = function () {
        say(successKey, true);
        form.reset();
        if (btn) btn.disabled = false;
      };

      if (!endpoint) {
        // Mode démonstration : aucun envoi réel.
        if (window.console) console.info("[QUAI 46] Formulaire en mode démo — configurez l'endpoint dans js/main.js");
        done();
        return;
      }

      if (btn) btn.disabled = true;
      var data = new FormData(form);
      data.append("langue", current);
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); done(); })
        .catch(function () { say("form.error", false); if (btn) btn.disabled = false; });
    });
  }

  document.querySelectorAll("form[data-form=waitlist]").forEach(function (f) {
    handleForm(f, WAITLIST_ENDPOINT, "form.success");
  });
  document.querySelectorAll("form[data-form=contact]").forEach(function (f) {
    handleForm(f, CONTACT_ENDPOINT, "form.sent");
  });

  /* Année du footer */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
