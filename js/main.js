/* QUAI 46 — Genève · main.js (sans dépendances) */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");
  var isEN = doc.lang === "en";

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
     FORMULAIRES — envoi vers Formspree sans recharger la page.
     L'identifiant se règle dans l'attribut action des formulaires
     (https://formspree.io/f/FORMSPREE_ID). Sans JavaScript, le
     formulaire est envoyé normalement à Formspree.
     ------------------------------------------------------------------ */
  var MSG = isEN ? {
    required: "This field is required.",
    email: "Please enter a valid email address (e.g. name@example.com).",
    consent: "Please tick this box to continue.",
    sending: "Sending…",
    okWaitlist: "Thank you. You are on the list — we will write to you before the first drop.",
    okContact: "Thank you. Your message has been sent; we will reply within 48 hours.",
    error: "Sorry, the message could not be sent. Please try again or write to contact@quai46.ch.",
    notReady: "The form is not active yet. Please write to contact@quai46.ch in the meantime."
  } : {
    required: "Ce champ est obligatoire.",
    email: "Veuillez saisir une adresse email valide (ex. nom@exemple.ch).",
    consent: "Veuillez cocher cette case pour continuer.",
    sending: "Envoi…",
    okWaitlist: "Merci. Vous êtes sur la liste — nous vous écrirons avant le premier drop.",
    okContact: "Merci. Votre message a bien été envoyé ; nous répondons sous 48 heures.",
    error: "Désolé, l’envoi a échoué. Veuillez réessayer ou écrire à contact@quai46.ch.",
    notReady: "Le formulaire n’est pas encore activé. Écrivez-nous en attendant à contact@quai46.ch."
  };
  // TODO: si l'adresse email change, la mettre à jour dans les messages ci-dessus.

  var EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

  function errorEl(field) {
    var ids = (field.getAttribute("aria-describedby") || "").split(/\s+/);
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (el && el.classList.contains("field-error")) return el;
    }
    return null;
  }

  function setError(field, msg) {
    var el = errorEl(field);
    if (msg) {
      field.setAttribute("aria-invalid", "true");
      if (el) { el.textContent = msg; el.hidden = false; }
    } else {
      field.removeAttribute("aria-invalid");
      if (el) { el.textContent = ""; el.hidden = true; }
    }
  }

  function validate(field) {
    var msg = "";
    if (field.type === "checkbox") {
      if (field.required && !field.checked) msg = MSG.consent;
    } else {
      var v = field.value.trim();
      if (field.required && !v) msg = MSG.required;
      else if (field.type === "email" && v && !EMAIL_RE.test(v)) msg = MSG.email;
    }
    setError(field, msg);
    return !msg;
  }

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.noValidate = true; // validation gérée ici, messages accessibles
    var status = form.querySelector(".form-status");
    var btn = form.querySelector("button[type=submit]");
    var btnLabel = btn ? btn.textContent : "";
    var fields = Array.prototype.slice.call(form.querySelectorAll("[required]"));
    var okMsg = form.getAttribute("data-form") === "contact" ? MSG.okContact : MSG.okWaitlist;

    function say(msg, kind) {
      if (!status) return;
      status.textContent = msg;
      status.classList.toggle("is-success", kind === "ok");
      status.classList.toggle("is-error", kind === "error");
    }

    fields.forEach(function (f) {
      var evt = f.type === "checkbox" ? "change" : "blur";
      f.addEventListener(evt, function () { if (f.type === "checkbox" || f.value) validate(f); });
      f.addEventListener("input", function () { if (f.getAttribute("aria-invalid")) validate(f); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      say("", null);

      var firstInvalid = null;
      fields.forEach(function (f) { if (!validate(f) && !firstInvalid) firstInvalid = f; });
      if (firstInvalid) { firstInvalid.focus(); return; }

      // Pot de miel : un robot a rempli le champ caché -> on simule un succès.
      var hp = form.querySelector("[name=_gotcha]");
      if (hp && hp.value) { form.reset(); say(okMsg, "ok"); return; }

      if (form.action.indexOf("FORMSPREE_ID") !== -1) { say(MSG.notReady, "error"); return; }

      if (btn) { btn.disabled = true; btn.setAttribute("aria-busy", "true"); btn.textContent = MSG.sending; }
      var done = function () {
        if (btn) { btn.disabled = false; btn.removeAttribute("aria-busy"); btn.textContent = btnLabel; }
      };

      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("HTTP " + r.status);
          form.reset();
          say(okMsg, "ok");
        })
        .catch(function () { say(MSG.error, "error"); })
        .then(done);
    });
  });

  /* Année du footer */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
