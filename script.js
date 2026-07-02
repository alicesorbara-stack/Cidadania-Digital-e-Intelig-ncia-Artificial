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
       2. VALIDADOR DO QUIZ (Sem travas de nulo)
       ========================================== */
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    if (quizForm && quizResult) {
        quizForm.addEventListener("submit", (event) => {
            event.preventDefault(); 

            const selectedOption = document.querySelector('input[name="answer"]:checked');
            quizResult.className = ""; 
            
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
