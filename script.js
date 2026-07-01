document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sistema do Modo Escuro
    const btnTheme = document.getElementById("btn-theme");
    const themeText = btnTheme.querySelector("span");
    
    btnTheme.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            themeText.textContent = "Modo Claro";
        } else {
            themeText.textContent = "Modo Escuro";
        }
    });

    // 2. Validador de Resposta do Quiz
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    quizForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Bloqueia a atualização da página

        const selectedOption = document.querySelector('input[name="answer"]:checked');

        // Limpa classes anteriores antes de validar
        quizResult.className = ""; 
        
        if (!selectedOption) {
            quizResult.textContent = "⚠️ Por favor, escolha uma alternativa antes de enviar.";
            quizResult.classList.add("quiz-result", "error");
            return;
        }

        // Validação lógica
        if (selectedOption.value === "correct") {
            quizResult.textContent = "🎉 Excelente! Resposta certa. A checagem em portais de confiança e a análise dos detalhes técnicos evitam que sejamos enganados.";
            quizResult.classList.add("success");
        } else {
            quizResult.textContent = "❌ Resposta incorreta. Lembre-se: as mídias sintéticas (IA) são projetadas para enganar nossa percepção visual direta. Sempre cheque as fontes.";
            quizResult.classList.add("error");
        }
    });
});
