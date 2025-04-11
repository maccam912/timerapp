document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const addMinuteBtn = document.getElementById('addMinuteBtn');
    const subtractMinuteBtn = document.getElementById('subtractMinuteBtn');
    const buttonContainer = document.querySelector('.button-container');
    
    // Initial time: 30 minutes in seconds
    let timeLeft = 30 * 60;
    let timerInterval;
    let isRunning = false;
    let inactivityTimer;
    
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
    
    // Start/pause timer
    startBtn.addEventListener('click', () => {
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
    
    // Function to handle inactivity and fading
    function startInactivityTimer() {
        clearTimeout(inactivityTimer);
        buttonContainer.classList.remove('fade');
        
        inactivityTimer = setTimeout(() => {
            buttonContainer.classList.add('fade');
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
