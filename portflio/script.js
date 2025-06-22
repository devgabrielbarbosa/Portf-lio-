// Seleciona o botão e o menu
const btnMenu = document.getElementById("btnMenu");
const navLinks = document.querySelector(".nav-links");

// Ouve o clique no botão para abrir/fechar o menu
btnMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Botão modo escuro
const btnModoEscuro = document.getElementById("modoEscuro");

// Alterna o modo escuro
if (btnModoEscuro) {
  btnModoEscuro.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    btnModoEscuro.textContent = document.body.classList.contains("dark-mode")
      ? "☀️" // ícone para modo claro
      : "🌙"; // ícone para modo escuro
  });
}
// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach((ancora) => {
  ancora.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    // Fecha menu hambúrguer após clique
    document.querySelector(".nav-links").classList.remove("show");
  });
});

btnMenu.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
import { db, collection } from "../firebase/firebase-config.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const portfolioContainer = document.querySelector("#projetos-portfolio");

  try {
    const snapshot = await getDocs(collection(db, "projetos"));
    const projetos = snapshot.docs.map((doc) => doc.data());

    projetos.forEach((projeto) => {
      const card = document.createElement("div");
      card.classList.add("projeto-card");

      card.innerHTML = `
      <div class="projeto">
        <img src="${projeto.imagem}" alt="${projeto.titulo}" />
        <h3>${projeto.titulo}</h3>
        <p class="descricao-produto">${projeto.descricao}</p>
        <button class="btn-projeto"><a href="${projeto.link}" target="_blank">Ver Projeto</a></button>
      </div>
      `;

      portfolioContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar projetos:", error);
  }

// Ativa o menu ao carregar a página
});


const elementos = document.querySelectorAll(".projeto");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
  }
);

elementos.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease-out";
  observer.observe(el);
});
const ctx = document.getElementById('graficoTecnologias').getContext('2d');

const graficoTecnologias = new Chart(ctx, {
  type: 'bar', // pode trocar para 'pie', 'doughnut', 'line' etc
  data: {
    labels: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    datasets: [{
      label: 'Nível de Conhecimento',
      data: [90, 85, 80, 70], // coloque aqui um nível que faça sentido para você (0-100)
      backgroundColor: [
        'rgba(227, 76, 38, 0.7)',    // vermelho HTML
        'rgba(38, 77, 228, 0.7)',    // azul CSS
        'rgba(247, 223, 30, 0.7)',   // amarelo JS
        'rgba(255, 134, 0, 0.7)'     // laranja Firebase
      ],
      borderColor: [
        'rgba(227, 76, 38, 1)',
        'rgba(38, 77, 228, 1)',
        'rgba(247, 223, 30, 1)',
        'rgba(255, 134, 0, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});
graficoTecnologias.update();