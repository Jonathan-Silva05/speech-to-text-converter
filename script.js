document.addEventListener("DOMContentLoaded", function() {
  var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = 'pt-BR'; // Definir o idioma para português do Brasil
  recognition.continuous = true; // Continuar ouvindo após a primeira transcrição

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


