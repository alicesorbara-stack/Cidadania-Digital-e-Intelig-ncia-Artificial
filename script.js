document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Alternador de Tema (Modo Escuro / Claro)
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

    // 2. Processador do Formulário Acadêmico (Quiz)
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    quizForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const selectedOption = document.querySelector('input[name="answer"]:checked');
        
        // Reseta os estados visuais da caixa de resposta
        quizResult.className = ""; 
        
        if (!selectedOption) {
            quizResult.textContent = "⚠️ Seleção pendente. Escolha uma alternativa metodológica para prosseguir.";
            quizResult.classList.add("error");
            quizResult.classList.remove("hidden");
            return;
        }

        if (selectedOption.value === "correct") {
            quizResult.textContent = "🎉 Resposta Correta. De acordo com as diretrizes de checagem, a suspensão do compartilhamento associada ao cruzamento de dados secundários barra a proliferação viral da desinformação.";
            quizResult.classList.add("success");
        } else {
            quizResult.textContent = "❌ Resposta Incorreta. O ecossistema de mídias sintéticas imita perfeitamente estruturas formais de autoridade. A checagem primária é indispensável.";
            quizResult.classList.add("error");
        }
        
        quizResult.classList.remove("hidden");
    });
});
