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
    textOutput.innerHTML = ''; // Limpar o texto anterior
  });

  // Quando clicar no botão "Parar"
  btnStop.addEventListener("click", function() {
    recognition.stop(); // Parar o reconhecimento de voz
  });

  // Evento chamado para cada pedaço de transcrição concluída
  recognition.onresult = function(event) {
    var transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        transcript += event.results[i][0].transcript + "<br>";
      }
    }
    textOutput.innerHTML += transcript; // Adicionar a transcrição ao elemento de texto
  };

  // Tratar possíveis erros
  recognition.onerror = function(event) {
    console.error("Erro no reconhecimento de voz: ", event.error);
  };
});
