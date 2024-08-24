const cadastroBtn = document.querySelector('#cadastro-btn');
const registroBtn = document.querySelector('#registro-btn');
const relatoriosBtn = document.querySelector('#relatorios-btn');
const cadastroForm = document.querySelector('#cadastro form');
const registroForm = document.querySelector('#registro-ponto form');
const relatoriosTable = document.querySelector('#relatorios-table');
const enviarRelatorioEmailBtn = document.querySelector('#enviar-relatorio-email');
const enviarRelatorioWhatsAppBtn = document.querySelector('#enviar-relatorio-whatsapp');

cadastroBtn.addEventListener('click', () => {
  cadastroForm.style.display = 'block';
  registroForm.style.display = 'none';
  relatoriosTable.style.display = 'none';
});

registroBtn.addEventListener('click', () => {
  cadastroForm.style.display = 'none';
  registroForm.style.display = 'block';
  relatoriosTable.style.display = 'none';
});

relatoriosBtn.addEventListener('click', () => {
  cadastroForm.style.display = 'none';
  registroForm.style.display = 'none';
  relatoriosTable.style.display = 'block';
});

// Função para cadastrar colaborador
async function cadastrarColaborador(event) {
  event.preventDefault();
  const nome = document.querySelector('#nome').value;
  const email = document.querySelector('#email').value;
  const senha = document.querySelector('#senha').value;
  try {
    const response = await fetch('/cadastrar-colaborador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, senha })
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

cadastroForm.addEventListener('submit', cadastrarColaborador);

// Função para registrar ponto
async function registrarPonto(event) {
  event.preventDefault();
  const tipoPonto = document.querySelector('#tipo-ponto').value;
  try {
    const response = await fetch('/registrar-ponto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tipoPonto })
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

registroForm.addEventListener('submit', registrarPonto);

// Função para carregar relatórios
async function carregarRelatorios() {
  try {
    const response = await fetch('/carregar-relatorios');
    const data = await response.json();
    const relatorios = data.relatorios;
    relatorios.forEach((relatorio) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${relatorio.data}</td>
        <td>${relatorio.tipoPonto}</td>
      `;
      relatoriosTable.tBodies[0].appendChild(row);
    });
  } catch (err) {
    console.error(err);
  }
}

carregarRelatorios();

// Função para enviar relatório por e-mail
async function enviarRelatorioEmail() {
  try {
    const response = await fetch('/enviar-relatorio-email');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

enviarRelatorioEmailBtn.addEventListener('click', enviarRelatorioEmail);

// Função para enviar relatório por WhatsApp
async function enviarRelatorioWhatsApp() {
  try {
    const response = await fetch('/enviar-relatorio-whatsapp');
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

enviarRelatorioWhatsAppBtn.addEventListener('click', enviarRelatorioWhatsApp);