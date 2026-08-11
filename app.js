// ===== DADOS =====
let remedios = [
  {
    id: 1,
    nome: "Dipirona",
    dosagem: "500mg",
    horario: "08:00",
    dias: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    foto: null
  },
  {
    id: 2,
    nome: "Ibuprofeno",
    dosagem: "400mg",
    horario: "12:00",
    dias: ["seg", "ter", "qua", "qui", "sex"],
    foto: null
  },
  {
    id: 3,
    nome: "Loratadina",
    dosagem: "10mg",
    horario: "20:00",
    dias: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
    foto: null
  }
];

let nextId = 4; // Próximo ID disponível

// ===== ELEMENTOS DO DOM =====
const form = document.getElementById("medicineForm");
const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");
const medicineList = document.getElementById("medicineList");

// ===== EVENT LISTENERS =====

// Quando arquivo é selecionado, mostrar preview
photoInput.addEventListener("change", function(event) {
  const file = event.target.files[0];
  
  if (!file) {
    photoPreview.innerHTML = "";
    return;
  }

  // Usar FileReader pra ler o arquivo
  const reader = new FileReader();

  reader.onload = function(e) {
    // e.target.result = URL da imagem em base64
    const imageUrl = e.target.result;
    photoPreview.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
  };

  // Começa a ler o arquivo
  reader.readAsDataURL(file);
});

// Quando formulário é enviado (ao clicar "Adicionar")
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Evita recarregar a página

  // Pegar valores do formulário
  const nome = document.getElementById("medicineName").value;
  const dosagem = document.getElementById("medicineDosage").value;
  const horario = document.getElementById("medicineTime").value;

  // Pegar dias selecionados
  const daysCheckboxes = document.querySelectorAll(".days-checkbox input[type='checkbox']");
  const dias = [];
  daysCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      dias.push(checkbox.value);
    }
  });

  // Validar
  if (!nome || !dosagem || !horario || dias.length === 0) {
    alert("Preencha todos os campos!");
    return;
  }

  // Pegar foto (se tiver)
  let foto = null;
  if (photoPreview.querySelector("img")) {
    foto = photoPreview.querySelector("img").src;
  }

  // Criar novo remédio
  const novoRemedio = {
    id: nextId,
    nome,
    dosagem,
    horario,
    dias,
    foto
  };

  // Adicionar ao array
  remedios.push(novoRemedio);
  nextId++;

  // Limpar formulário
  form.reset();
  photoPreview.innerHTML = "";

  // Re-renderizar
  renderMedicines();
});

// ===== RENDER =====
function renderMedicines() {
  medicineList.innerHTML = "";

  remedios.forEach(remedio => {
    const diasFormatado = remedio.dias.join(", ");

    const cardHTML = `
      <div class="medicine-card">
        ${remedio.foto ? `<img src="${remedio.foto}" class="medicine-photo" alt="${remedio.nome}">` : ""}
        
        <button class="btn-delete" onclick="deleteMedicine(${remedio.id})">
          🗑️ Deletar
        </button>

        <div class="medicine-info">
          <h2>${remedio.nome}</h2>
          <p><strong>Dosagem:</strong> ${remedio.dosagem}</p>
          <div class="medicine-days">
            <strong>Dias:</strong> ${diasFormatado}
          </div>
        </div>
        <div class="medicine-time">
          ${remedio.horario}
        </div>
      </div>
    `;

    medicineList.innerHTML += cardHTML;
  });
}

// ===== DELETE =====
function deleteMedicine(id) {
  if (confirm("Tem certeza que quer deletar?")) {
    // Filtra removendo o remédio com esse ID
    remedios = remedios.filter(rem => rem.id !== id);
    renderMedicines();
  }
}

// Renderiza ao carregar
renderMedicines();