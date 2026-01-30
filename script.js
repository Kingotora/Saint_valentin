document.addEventListener('DOMContentLoaded', () => {
    const btnForcedYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    // --- LOGIQUE DU BOUTON "NON" ---
    function moveButton() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const btnRect = btnNo.getBoundingClientRect();

        const newX = Math.random() * (windowWidth - btnRect.width - 40) + 20;
        const newY = Math.random() * (windowHeight - btnRect.height - 40) + 20;

        btnNo.style.position = 'fixed';
        btnNo.style.left = `${newX}px`;
        btnNo.style.top = `${newY}px`;
        btnNo.style.zIndex = '1000';

        const texts = ["Raté !", "Essaie encore", "Flop", "Impossible", "BAHHAHAHAHA", "Allez clique sur Oui", "Naze", "T'as cru ?", "Force pas..."];

        if (Math.random() > 0.3) {
            btnNo.innerText = texts[Math.floor(Math.random() * texts.length)];
        }
    }

    btnNo.addEventListener('mouseover', moveButton);
    btnNo.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(); });
    btnNo.addEventListener('click', (e) => { e.preventDefault(); moveButton(); });


    // --- LOGIQUE DU BOUTON "OUI" ---
    btnForcedYes.addEventListener('click', () => {
        // 1. Confettis
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ffffff', '#000000']
        });

        // 2. Afficher le Chat Dansant (FORCAGE DISPLAY)
        const catOverlay = document.getElementById('cat-celebration');
        if (catOverlay) {
            catOverlay.classList.add('visible'); // Passera en display: flex grâce au CSS
            catOverlay.style.display = 'flex'; // Force brute JS au cas où

            // Démarrer l'emoji rain
            if (typeof createEmojiRain === 'function') {
                createEmojiRain();
            }
        }

        // 3. Délai festif + Fade transition
        setTimeout(() => {
            // Add fade-out effect
            document.body.classList.add('page-fade-out');

            // Wait for fade animation to complete, then navigate
            setTimeout(() => {
                window.location.href = "programme.html";
            }, 500);
        }, 4000); // 6 secondes pour profiter de la célébration
    });
});

