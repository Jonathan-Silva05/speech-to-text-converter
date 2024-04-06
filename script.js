/*// cria as constantes que referenciam os botões e a área de texto onde iremos transcrever o áudio
const texto = document.querySelector(".texto");
const btnStart = document.querySelector("#btnStart");
const btnStop = document.querySelector("#btnStop");

// configurar o webkit de reconhecimento de fala
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true; // Se definido como false o resultado será apresentado após a fala
recognition.lang = "pt-BR";

// criando uma nova tag p
let p = document.createElement("p");

// Inicializa a transcrição com o parágrafo recém-criado
texto.appendChild(p);

// Função para lidar com os resultados do reconhecimento de fala
recognition.addEventListener('result', e => {
  // Converte o resultado do reconhecimento de fala em texto
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  // Atualiza o texto do parágrafo com a transcrição
  p.textContent = transcript;

  // Se o resultado for final, cria um novo parágrafo para a próxima transcrição
  if (e.results[0].isFinal) {
    p = document.createElement("p");
    texto.appendChild(p);
  }
});

// Inicia o reconhecimento de fala quando o botão 'Iniciar' é clicado
btnStart.addEventListener('click', () => {
  recognition.start();
});

// Para o reconhecimento de fala quando o botão 'Parar' é clicado
btnStop.addEventListener('click', () => {
  recognition.stop();
});

// Reinicia o reconhecimento de fala automaticamente quando termina
recognition.addEventListener('end', recognition.start);*/


document.addEventListener("DOMContentLoaded", function() {
  var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = 'pt-BR'; // Definir o idioma para português do Brasil
  recognition.continuous = false; // Não continuar ouvindo após a primeira transcrição

  // Botões e elementos do DOM
  var btnStart = document.getElementById("btnStart");
  var btnStop = document.getElementById("btnStop");
  var textOutput = document.querySelector(".texto");

  // Quando clicar no botão "Iniciar"
  btnStart.addEventListener("click", function() {
    recognition.start(); // Iniciar o reconhecimento de voz
  });

  // Quando clicar no botão "Parar"
  btnStop.addEventListener("click", function() {
    recognition.stop(); // Parar o reconhecimento de voz
  });

  // Evento chamado quando o reconhecimento de voz é concluído
  recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript; // Capturar a transcrição
    textOutput.innerHTML += transcript + "<br>"; // Adicionar a transcrição ao elemento de texto
  };

  // Tratar possíveis erros
  recognition.onerror = function(event) {
    console.error("Erro no reconhecimento de voz: ", event.error);
  };
});


