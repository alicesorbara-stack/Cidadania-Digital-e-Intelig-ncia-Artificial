document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       1. CONTROLE DAS ABAS
       ========================================== */
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            
            const targetContent = document.getElementById(tab.dataset.tab);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });

    /* ==========================================
       2. VALIDADOR DO QUIZ (Atualizado para Múltiplas Perguntas)
       ========================================== */
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    if (quizForm && quizResult) {
        quizForm.addEventListener("submit", (event) => {
            event.preventDefault(); 

            // Busca as respostas selecionadas para cada uma das perguntas
            const q1Answer = document.querySelector('input[name="q1"]:checked');
            const q2Answer = document.querySelector('input[name="q2"]:checked');
            
            quizResult.className = ""; 
            
            // Validação: verifica se todas as perguntas foram respondidas
            if (!q1Answer || !q2Answer) {
                quizResult.textContent = "⚠️ PARÂMETRO AUSENTE: Responda a todas as questões para análise.";
                quizResult.classList.add("error");
                return;
            }

            // Contabiliza os acertos
            let correctCount = 0;
            if (q1Answer.value === "correct") correctCount++;
            if (q2Answer.value === "correct") correctCount++;

            // Exibe o resultado com base no desempenho do usuário
            if (correctCount === 2) {
                quizResult.textContent = "✓ SUCESSO COMPLETO: Você acertou as 2 questões! Demonstra excelente criticidade sobre mídias sintéticas e ética digital.";
                quizResult.classList.add("success");
            } else if (correctCount === 1) {
                quizResult.textContent = "⚠ ATENÇÃO PARCIAL: Você acertou 1 de 2 questões. Lembre-se que tanto a checagem rigorosa quanto o uso ético da rede são obrigatórios.";
                quizResult.classList.add("error");
            } else {
                quizResult.textContent = "✕ ANOMALIA CRÍTICA: Nenhuma resposta correta. As mídias sintéticas e algoritmos simulam credibilidade com exatidão. Revise os artigos.";
                quizResult.classList.add("error");
            }
        });
    }

    /* ==========================================
       3. JOGO DA MEMÓRIA (Com trava antiqueda)
       ========================================== */
    const grid = document.getElementById("gameGrid");
    const resetBtn = document.getElementById("reset-btn");

    if (grid) {
        const emojis = ['🤖', '🤖', '🔒', '🔒', '💻', '💻', '🔍', '🔍', '🧠', '🧠', '🛡️', '🛡️', '📱', '📱', '🎭', '🎭'];
        let shuffledEmojis = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let lockBoard = false;

        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        function createBoard() {
            grid.innerHTML = '';
            shuffledEmojis = shuffle([...emojis]);
            flippedCards = [];
            matchedPairs = 0;
            lockBoard = false;

            shuffledEmojis.forEach((emoji, index) => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.dataset.index = index;
                card.innerHTML = emoji;
                card.addEventListener('click', flipCard);
                grid.appendChild(card);
            });
        }

        function flipCard() {
            if (lockBoard) return;
            if (this === flippedCards[0]) return; // Evita duplo clique na mesma carta

            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                lockBoard = true;
                setTimeout(checkMatch, 600);
            }
        }

        function checkMatch() {
            const [card1, card2] = flippedCards;
            const index1 = card1.dataset.index;
            const index2 = card2.dataset.index;

            if (shuffledEmojis[index1] === shuffledEmojis[index2]) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                if (matchedPairs === emojis.length / 2) {
                    setTimeout(() => { alert('Parabéns! Você encontrou todos os conceitos!'); }, 200);
                }
                flippedCards = [];
                lockBoard = false;
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                    lockBoard = false;
                }, 600);
            }
        }

        createBoard();
        if (resetBtn) resetBtn.addEventListener("click", createBoard);
    }
});
