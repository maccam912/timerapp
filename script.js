document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const addMinuteBtn = document.getElementById('addMinuteBtn');
    const subtractMinuteBtn = document.getElementById('subtractMinuteBtn');
    const musicBtn = document.getElementById('musicBtn');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const buttonContainer = document.querySelector('.button-container');
    const audioControls = document.querySelector('.audio-controls');
    
    // Initial time: 30 minutes in seconds
    let timeLeft = 30 * 60;
    let timerInterval;
    let isRunning = false;
    let inactivityTimer;
    let isMusicPlaying = false;
    
    // Format seconds into MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Update timer display
    function updateDisplay() {
        timerDisplay.textContent = formatTime(timeLeft);
    }
    
    // Timer complete function
    function timerComplete() {
        clearInterval(timerInterval);
        document.body.classList.add('time-up');
        timerDisplay.textContent = "Time's Up!";
        isRunning = false;
        startBtn.textContent = "Start";
    }
    
    // Start/pause timer function
    function toggleTimer() {
        if (isRunning) {
            // Pause timer
            clearInterval(timerInterval);
            isRunning = false;
            startBtn.textContent = "Start";
        } else {
            // Check if timer is already complete
            if (timeLeft <= 0) {
                resetTimer();
            }
            
            // Remove time-up class if it exists
            document.body.classList.remove('time-up');
            
            // Start timer
            isRunning = true;
            startBtn.textContent = "Pause";
            
            timerInterval = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft <= 0) {
                    timerComplete();
                }
            }, 1000);
        }
    }
    
    // Start/pause timer button event
    startBtn.addEventListener('click', toggleTimer);
    
    // Spacebar key event to toggle play/pause
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            // Prevent default spacebar behavior (like page scrolling)
            event.preventDefault();
            toggleTimer();
        }
    });
    
    // Reset timer function
    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = 30 * 60;
        updateDisplay();
        isRunning = false;
        startBtn.textContent = "Start";
        document.body.classList.remove('time-up');
    }
    
    // Add a minute to the timer
    addMinuteBtn.addEventListener('click', () => {
        timeLeft += 60; // Add 60 seconds (1 minute)
        updateDisplay();
    });
    
    // Subtract a minute from the timer
    subtractMinuteBtn.addEventListener('click', () => {
        if (timeLeft > 60) {
            timeLeft -= 60; // Subtract 60 seconds (1 minute)
        } else {
            timeLeft = 0; // Don't go below zero
        }
        updateDisplay();
    });
    
    // Reset button event
    resetBtn.addEventListener('click', resetTimer);
      // Function to toggle background music
    function toggleMusic() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicBtn.textContent = "🔈 Music";
            isMusicPlaying = false;
        } else {
            backgroundMusic.play();
            musicBtn.textContent = "🔊 Music";
            isMusicPlaying = true;
        }
    }
    
    // Music button event listener
    musicBtn.addEventListener('click', toggleMusic);
    
    // Volume slider event listener
    volumeSlider.addEventListener('input', () => {
        backgroundMusic.volume = volumeSlider.value;
    });
    
    // Set initial volume
    backgroundMusic.volume = volumeSlider.value;
    
    // Function to handle inactivity and fading
    function startInactivityTimer() {
        clearTimeout(inactivityTimer);
        buttonContainer.classList.remove('fade');
        audioControls.classList.remove('fade');
        
        inactivityTimer = setTimeout(() => {
            buttonContainer.classList.add('fade');
            audioControls.classList.add('fade');
        }, 5000); // 5 seconds of inactivity
    }
    
    // Add event listeners for activity detection
    document.addEventListener('mousemove', startInactivityTimer);
    document.addEventListener('click', startInactivityTimer);
    document.addEventListener('keydown', startInactivityTimer);
    
    // Start the inactivity timer when the page loads
    startInactivityTimer();
    
    // Initialize timer display
    updateDisplay();
});
