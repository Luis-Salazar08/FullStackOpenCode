'use strict';

// ===== NAVBAR: cambio al hacer scroll =====
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scroll-top');

function onScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (window.scrollY > 300) {
    scrollTop.classList.add('show');
  } else {
    scrollTop.classList.remove('show');
  }
}

window.addEventListener('scroll', onScroll);

// ===== MENÚ HAMBURGUESA (móvil) =====
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function closeMenu() {
  navMenu.classList.remove('active');
  navToggle.classList.remove('active');
}

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Cerrar menú al hacer click en un link
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

// Cerrar menú al hacer click fuera
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
    closeMenu();
  }
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== REVEAL / FADE-IN AL SCROLL =====
const revealElements = document.querySelectorAll('.section, .sobre-avatar, .skill-card, .project-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Animación de barras de habilidad cuando son visibles
const skillBars = document.querySelectorAll('.skill-fill');

const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.level || bar.style.width;
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.width = width;
          });
        });
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.4 }
);

skillBars.forEach((bar) => {
  const width = bar.style.width;
  bar.style.width = '0%';
  bar.setAttribute('data-level', width);
  barObserver.observe(bar);
});

// ===== VALIDACIÓN DE FORMULARIO =====
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function setError(input, message) {
  const errorMsg = input.parentElement.querySelector('.error-msg');
  input.classList.add('invalid');
  errorMsg.textContent = message;
}

function clearError(input) {
  const errorMsg = input.parentElement.querySelector('.error-msg');
  input.classList.remove('invalid');
  errorMsg.textContent = '';
}

function validateNombre() {
  const input = document.getElementById('nombre');
  if (input.value.trim().length < 3) {
    setError(input, 'Ingresa tu nombre (mínimo 3 caracteres)');
    return false;
  }
  clearError(input);
  return true;
}

function validateEmail() {
  const input = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.value.trim())) {
    setError(input, 'Ingresa un email válido');
    return false;
  }
  clearError(input);
  return true;
}

function validateMensaje() {
  const input = document.getElementById('mensaje');
  if (input.value.trim().length < 10) {
    setError(input, 'El mensaje debe tener al menos 10 caracteres');
    return false;
  }
  clearError(input);
  return true;
}

const validators = {
  nombre: validateNombre,
  email: validateEmail,
  mensaje: validateMensaje,
};

Object.keys(validators).forEach((id) => {
  const input = document.getElementById(id);
  input.addEventListener('blur', validators[id]);
  input.addEventListener('input', () => {
    if (input.classList.contains('invalid')) {
      validators[id]();
    }
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.hidden = true;

  const results = Object.values(validators).map((fn) => fn());

  if (results.every(Boolean)) {
    formSuccess.hidden = false;
    form.reset();
    setTimeout(() => {
      formSuccess.hidden = true;
    }, 5000);
  }
});

// ===== BOTÓN SCROLL TO TOP =====
scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
