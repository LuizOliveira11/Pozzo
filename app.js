console.log('Pozzo app iniciado!');

// Array com 3 remédios de exemplo
const remedios = [
  {
    id: 1,
    nome: "Dipirona",
    dosagem: "500mg",
    horario: "08:00",
    dias: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"]
  },
  {
    id: 2,
    nome: "Ibuprofeno",
    dosagem: "400mg",
    horario: "12:00",
    dias: ["seg", "ter", "qua", "qui", "sex"]
  },
  {
    id: 3,
    nome: "Dipirona",
    dosagem: "500mg",
    horario: "20:00",
    dias: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"]
  }
];

// Função para renderizar a lista
function renderMedicines() {
  const medicineList = document.getElementById("medicineList");
  
  // Limpa o que tinha antes
  medicineList.innerHTML = "";
  
  // Para cada remédio, cria um card e adiciona ao DOM
  remedios.forEach(remedio => {
    // Template string para criar o HTML do card
    const diasFormatado = remedio.dias.join(", ");
    
    const cardHTML = `
      <div class="medicine-card">
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
    
    // Adiciona o card ao container
    medicineList.innerHTML += cardHTML;
  });
}

// Chama a função quando a página carrega
renderMedicines();

console.log("Remédios carregados:", remedios);

