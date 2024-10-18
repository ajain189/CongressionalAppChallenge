// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }

    // Pomodoro Timer
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('startPomodoro');
    const resetButton = document.getElementById('resetPomodoro');

    let timer;
    let timeLeft = 25 * 60; // 25 minutes

    function updateTimer() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    if (startButton && resetButton) {
        startButton.addEventListener('click', () => {
            if (!timer) {
                timer = setInterval(() => {
                    timeLeft--;
                    updateTimer();
                    if (timeLeft === 0) {
                        clearInterval(timer);
                        alert('Pomodoro session completed!');
                        timer = null;
                        startButton.textContent = 'Start';
                    }
                }, 1000);
                startButton.textContent = 'Pause';
            } else {
                clearInterval(timer);
                timer = null;
                startButton.textContent = 'Resume';
            }
        });

        resetButton.addEventListener('click', () => {
            clearInterval(timer);
            timer = null;
            timeLeft = 25 * 60;
            updateTimer();
            startButton.textContent = 'Start';
        });

        updateTimer();
    }
});

// Study Tip of the Day
const tipText = document.getElementById('tipText');
const newTipButton = document.getElementById('newTip');

const tips = [
    "Create a study schedule and stick to it.",
    "Take regular breaks to maintain focus.",
    "Use active recall techniques like flashcards.",
    "Teach the material to someone else to reinforce your understanding.",
    "Stay hydrated and eat healthy snacks while studying.",
    "Use the Pomodoro technique: 25 minutes of focus, then a 5-minute break.",
    "Find a study environment that works best for you.",
    "Review your notes within 24 hours of taking them.",
    "Use mnemonic devices to remember complex information.",
    "Get enough sleep to consolidate your memories."
];

function getRandomTip() {
    return tips[Math.floor(Math.random() * tips.length)];
}

function displayNewTip() {
    if (tipText) {
        tipText.textContent = getRandomTip();
    }
}

if (newTipButton) {
    newTipButton.addEventListener('click', displayNewTip);
    displayNewTip(); // Display initial tip
}

// Ensure all elements are initialized
document.addEventListener('DOMContentLoaded', (event) => {
    // Dark mode
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }

    // Study Tip
    displayNewTip();

    // ... (other initializations if needed) ...
});