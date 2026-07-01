document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Sistema Lógico de Abas (Navegação Avançada)
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove a classe ativa de todos os botões e conteúdos
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            // Ativa a aba clicada e exibe seu respectivo contêiner
            tab.classList.add("active");
            const targetContent = document.getElementById(tab.dataset.tab);
            targetContent.classList.add("active");
        });
    });

    // 2. Validador Técnico do Quiz
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    quizForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const selectedOption = document.querySelector('input[name="answer"]:checked');
        
        quizResult.className = ""; // Limpa os estados de erro/sucesso
        
        if (!selectedOption) {
            quizResult.textContent = "⚠️ PARÂMETRO AUSENTE: Selecione uma alternativa para análise.";
            quizResult.classList.add("error");
            return;
        }

        if (selectedOption.value === "correct") {
            quizResult.textContent = "✓ SUCESSO DO SISTEMA: Interromper o compartilhamento e cruzar referências com repositórios confiáveis mitiga a proliferação da desinformação.";
            quizResult.classList.add("success");
        } else {
            quizResult.textContent = "✕ ANOMALIA DETECTADA: As mídias sintéticas replicam padrões formais de credibilidade com exatidão. A checagem primária é mandatória.";
            quizResult.classList.add("error");
        }
    });
});
