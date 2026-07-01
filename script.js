document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Controle das Abas (Navegação Segura e Acessível)
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove a classe ativa e redefine os atributos de acessibilidade
            tabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            
            contents.forEach(c => c.classList.remove("active"));

            // Ativa a aba clicada
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            
            const targetContent = document.getElementById(tab.dataset.tab);
            
            // Tratamento contra erro de ID inexistente
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });

    // 2. Validador do Quiz
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    if (quizForm && quizResult) {
        quizForm.addEventListener("submit", (event) => {
            event.preventDefault(); 

            const selectedOption = document.querySelector('input[name="answer"]:checked');
            
            quizResult.className = ""; // Reseta classes antigas
            
            if (!selectedOption) {
                quizResult.textContent = "⚠️ PARÂMETRO AUSENTE: Selecione uma alternativa para análise.";
                quizResult.classList.add("error");
                return;
            }

            if (selectedOption.value === "correct") {
                quizResult.textContent = "✓ SUCESSO: Interromper o compartilhamento e cruzar referências com repositórios oficiais mitiga a proliferação da desinformação.";
                quizResult.classList.add("success");
            } else {
                quizResult.textContent = "✕ ANOMALIA: As mídias sintéticas replicam padrões formais de credibilidade com exatidão. A checagem primária é mandatória.";
                quizResult.classList.add("error");
            }
        });
    }
});
