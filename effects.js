// ==================== COUNTDOWN TIMER ====================
function initCountdown() {
    const valentineDay = new Date('2026-02-14T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = valentineDay - now;

        if (distance < 0) {
            if (document.getElementById('countdown')) {
                document.getElementById('countdown').innerHTML = '<h2>C\'est aujourd\'hui ! 💖</h2>';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById('days')) {
            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }

        // Progressive unlock
        checkUnlocks(days);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Progressive unlock system
function checkUnlocks(daysRemaining) {
    const timelineItems = document.querySelectorAll('.timeline-item[data-unlock]');
    const unlockStatus = document.getElementById('unlock-status');
    let unlockedCount = 0;
    let nextUnlockDays = null;

    timelineItems.forEach(item => {
        const unlockDays = parseInt(item.getAttribute('data-unlock'));
        const content = item.querySelector('.content');
        const daysLeftSpan = item.querySelector('.days-left');

        if (unlockDays >= daysRemaining) {
            // UNLOCK
            content.classList.remove('locked');
            content.classList.add('unlocked');
            content.querySelector('.unlock-icon').innerHTML = '✅';
            content.querySelector('.locked-text').style.display = 'none';
            content.querySelector('.unlocked-text').style.display = 'block';
            unlockedCount++;
        } else {
            // LOCKED - show days until unlock
            const daysUntilUnlock = daysRemaining - unlockDays;
            if (daysLeftSpan) {
                daysLeftSpan.innerText = daysUntilUnlock;
            }
            if (nextUnlockDays === null || daysUntilUnlock < nextUnlockDays) {
                nextUnlockDays = daysUntilUnlock;
            }
        }
    });

    // Update status
    if (unlockStatus) {
        if (unlockedCount === 4) {
            unlockStatus.innerHTML = '✨ <strong>Toutes les activités débloquées !</strong> 🎊';
        } else if (nextUnlockDays !== null) {
            unlockStatus.innerHTML = `🔓 <strong>${unlockedCount}/4 activités</strong> • Prochain dans <strong>${nextUnlockDays} jour${nextUnlockDays > 1 ? 's' : ''}</strong>`;
        }
    }
}

// Initialiser
if (document.getElementById('countdown')) {
    initCountdown();
}

// ==================== EMOJI RAIN ====================
function createEmojiRain() {
    const emojiRain = document.getElementById('emoji-rain');
    if (!emojiRain) return;

    const emojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '🌹', '✨', '⭐', '💫'];

    function createEmoji() {
        const emoji = document.createElement('div');
        emoji.className = 'falling-emoji';
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDuration = (Math.random() * 3 + 2) + 's';
        emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
        emojiRain.appendChild(emoji);

        setTimeout(() => emoji.remove(), 5000);
    }

    setInterval(createEmoji, 200);
}

// ==================== LOVE MESSAGES ====================
const loveMessages = [
    "Chaque moment avec toi est un trésor 💎",
    "Tu illumines mes journées comme personne 🌟",
    "Mon cœur bat plus fort quand tu es là 💓",
    "Avec toi, chaque jour est une aventure 🗺️",
    "Tu es ma personne préférée au monde 🌍",
    "Merci d'être exactement comme tu es 💖",
    "Tu rends ma vie tellement meilleure ✨",
    "Je ne me lasse jamais de ton sourire 😊"
];

function initLoveMessages() {
    const messageElement = document.getElementById('love-message');
    if (!messageElement) return;

    const p = messageElement.querySelector('p');
    let currentIndex = 0;

    function showMessage() {
        p.style.opacity = '0';
        setTimeout(() => {
            p.textContent = loveMessages[currentIndex];
            p.style.opacity = '1';
            currentIndex = (currentIndex + 1) % loveMessages.length;
        }, 500);
    }

    showMessage();
    setInterval(showMessage, 3000);
}

if (document.getElementById('love-message')) {
    initLoveMessages();
}

// ==================== FLOATING HEARTS ====================
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 20000);
    }

    for (let i = 0; i < 8; i++) {
        setTimeout(createHeart, i * 1000);
    }

    setInterval(createHeart, 2500);
}

if (document.getElementById('floating-hearts')) {
    createFloatingHearts();
}
