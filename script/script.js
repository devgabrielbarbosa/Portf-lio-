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

    <div class="botoes-projeto">
      <button class="toggle-descricao">Leia mais</button>
      <button class="btn-projeto">
        <a href="${projeto.link}" target="_blank" rel="noopener noreferrer">Ver Projeto</a>
      </button>
    </div>
  </div>
`;

      portfolioContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao carregar projetos:", error);
  }

// Ativa o menu ao carregar a página
});
// Após o código que monta os projetos
const projetosContainer = document.getElementById('projetos-portfolio'); // Sem espaço

projetosContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('toggle-descricao')) {
    const card = e.target.closest('.projeto'); // Pega o card
    const descricao = card.querySelector('.descricao-produto'); // Pega o parágrafo da descrição

    descricao.classList.toggle('expandido'); // Alterna classe
    e.target.textContent = descricao.classList.contains('expandido')
      ? 'Ler mais'
      : 'Mostrar menos';
  }
});

document.querySelectorAll('.toggle-descricao').forEach(btn => {
  btn.addEventListener('click', () => {
    const descricao = btn.closest('.projeto').querySelector('.descricao-produto');
    descricao.classList.toggle('expandido');
    btn.textContent = descricao.classList.contains('expandido') ? 'Ver menos' : 'Leia mais';
  });
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
    labels: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'React', 'Node'], // coloque aqui as tecnologias que você domina
    datasets: [{
      label: 'Nível de Conhecimento',
      data: [90, 85, 80, 70, 48, 37], // coloque aqui um nível que faça sentido para você (0-100)
      backgroundColor: [
        'rgba(227, 76, 38, 0.7)',    // vermelho HTML
        'rgba(38, 77, 228, 0.7)',    // azul CSS
        'rgba(247, 223, 30, 0.7)',   // amarelo JS
        'rgba(255, 134, 0, 0.7)',     // laranja Firebase
        'rgba(0, 204, 102, 0.7)',    // verde React
        'rgba(153, 51, 255, 0.7)'     //
      ],
      borderColor: [
        'rgba(227, 76, 38, 1)',
        'rgba(38, 77, 228, 1)',
        'rgba(247, 223, 30, 1)',
        'rgba(255, 134, 0, 1)',
        'rgba(0, 204, 102, 1)',
        'rgba(153, 51, 255, 1)'
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