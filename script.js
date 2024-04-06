document.addEventListener("DOMContentLoaded", function() {
  var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = 'pt-BR'; // Definir o idioma para português do Brasil
  recognition.continuous = true; // Continuar ouvindo após a primeira transcrição
  recognition.interimResults = true; // Capturar resultados provisórios

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
    var finalTranscript = ''; // Transcrição final
    var interimTranscript = ''; // Transcrição provisória
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    // Atualizar a exibição com transcrições final e provisória
    textOutput.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i><br>';
  };

  // Tratar possíveis erros
  recognition.onerror = function(event) {
    console.error("Erro no reconhecimento de voz: ", event.error);
  };
});
