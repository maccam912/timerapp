document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    // Initial time: 15 minutes in seconds
    let timeLeft = 15 * 60;
    let timerInterval;
    let isRunning = false;
    
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
        timeLeft = 15 * 60;
        updateDisplay();
        isRunning = false;
        startBtn.textContent = "Start";
        document.body.classList.remove('time-up');
    }
    
    // Reset button event
    resetBtn.addEventListener('click', resetTimer);
    
    // Initialize timer display
    updateDisplay();
});
