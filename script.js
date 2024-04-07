document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('dictateButton');
    var input = document.getElementById('textInput');

    // Verifica se a API de reconhecimento de fala é suportada
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    if (typeof SpeechRecognition === "undefined") {
        button.disabled = true;
        button.textContent = "Reconhecimento de fala não suportado";
        return;
    }

    var recognition = new SpeechRecognition();
    recognition.continuous = false; // Reinicia automaticamente a captura após o usuário parar de falar
    recognition.lang = "pt-BR"; // Define o idioma para Português do Brasil
    recognition.interimResults = false; // Resultados provisórios são desabilitados

    recognition.onresult = function(event) {
        var lastResult = event.results.length - 1;
        var text = event.results[lastResult][0].transcript;
        input.value = text; // Define o texto reconhecido no campo de entrada
    };

    button.onclick = function() {
        recognition.start(); // Inicia o reconhecimento de fala
    };
});
