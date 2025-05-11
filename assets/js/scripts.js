const textElement = document.getElementById("typewriter-text");
const phrases = [
  "Desenvolvedor Web Full Stack",
  "UX/UI Designer",
  "Especialista em Front-End",
  "Criador de Soluções Digitais",
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // Velocidade em ms

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting && charIndex <= currentPhrase.length) {
    // Digitando
    textElement.textContent = currentPhrase.substring(0, charIndex);
    charIndex++;
    typingSpeed = 100; // Velocidade normal
  } else if (isDeleting && charIndex >= 0) {
    // Apagando
    textElement.textContent = currentPhrase.substring(0, charIndex);
    charIndex--;
    typingSpeed = 50; // Velocidade mais rápida para apagar
  } else {
    // Troca de frase
    isDeleting = !isDeleting;
    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    typingSpeed = isDeleting ? 1500 : 500; // Pausas
  }

  setTimeout(typeWriter, typingSpeed);
}

// Inicia o efeito
window.onload = function () {
  setTimeout(typeWriter, 1000);
};

// Observa quando a seção entra na viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateProgressBars();
        observer.unobserve(entry.target); // Para de observar após animar
      }
    });
  },
  { threshold: 0.3 }
); // Dispara quando 30% da seção está visível

// Observa a seção de habilidades
const skillsSection = document.getElementById("skills");
observer.observe(skillsSection);

// Função que anima as barras
function animateProgressBars() {
  const progressFills = document.querySelectorAll(".progress-fill");

  progressFills.forEach((fill) => {
    const targetWidth = fill.getAttribute("data-width");
    fill.style.width = targetWidth + "%";
  });
}

// Função principal encapsulada
function initCounterAnimation() {
  // Verifica se o IntersectionObserver está disponível
  if (!("IntersectionObserver" in window)) {
    animateNumbers(); // Fallback: anima imediatamente
    return;
  }

  // Configura o observer
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateNumbers();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observa a seção
  var statsSection = document.getElementById("numeros");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Função de animação melhorada
function animateNumbers() {
  var numberElements = document.querySelectorAll(".stat-number");
  var duration = 2000;
  var frameDuration = 1000 / 60;

  numberElements.forEach(function (element) {
    var target = parseFloat(element.getAttribute("data-target"));
    var start = 0;
    var totalFrames = Math.round(duration / frameDuration);
    var frame = 0;

    var counter = setInterval(function () {
      frame++;
      var progress = frame / totalFrames;
      var currentValue = target * progress;

      // Formatação diferenciada para inteiros/decimais
      if (target % 1 !== 0) {
        element.textContent = currentValue.toFixed(1);
      } else {
        element.textContent = Math.round(currentValue);
      }

      if (frame === totalFrames) {
        clearInterval(counter);
        element.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
      }
    }, frameDuration);
  });
}

// Inicia quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", initCounterAnimation);
