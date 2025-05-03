let timecount = document.getElementById("timer");
let breaktime = document.getElementById("break");
let shortSession = document.getElementById("short-session");
let longSession = document.getElementById("long-session");
let shortBreak = document.getElementById("short-break");
let longBreak = document.getElementById("long-break");
let timers = document.querySelectorAll(".timer-display");

let shortSessionMsg = document.getElementById("short-session-msg");
let longSessionMsg = document.getElementById("long-session-msg");
let shortBreakMsg = document.getElementById("short-break-msg");
let longBreakMsg = document.getElementById("long-break-msg");
let message = document.querySelectorAll(".message");

let startBtn = document.getElementById("start");
let returnBtn = document.getElementById("return");

let timerMsg = document.getElementById("announcement");

let studymode = true; // if study mode is true, then break is false
let shortsession = true; // if short session: return 25 or 5, if long session: return 50 or 10

let currentTimer = null
let myInterval = null
let remainingTime = 0;  
let TimerIsRunning = false;

//default timer
function showDefaultTimer() {
    timers.forEach(timer => {
        timer.style.display = "none";
    });
    shortSession.style.display = "block";
}

showDefaultTimer()

//default announcement
function showDefaultAnnouncement() {
    message.forEach(drink => {
        drink.style.display = "none";
    });
    shortSessionMsg.style.display = "block";
}

showDefaultAnnouncement()


// timer display
function TimeDisplay() {
    timers.forEach(timer => timer.style.display = "none");
    message.forEach(drink => drink.style.display = "none");

    if (studymode) {
        if (shortsession) {
            shortSession.style.display = "block";
            shortSessionMsg.style.display = "block";
        }
        else {
            longSession.style.display = "block";
            longSessionMsg.style.display = "block";
        }
    }
    else {
        if (shortsession) {
            shortBreak.style.display = "block";
            shortBreakMsg.style.display = "block";
        }
        else {
            longBreak.style.display = "block";
            longBreakMsg.style.display = "block";
        }
    }
}

// button click
timecount.addEventListener("click", () => {
    if (!studymode) {
        studymode = true;
        shortsession = true;
    } else {
        shortsession = !shortsession;
    }
   TimeDisplay();
});

breaktime.addEventListener("click", () => {
    if (studymode) {
        studymode = false;
        shortsession = true;
    } else {
        shortsession = !shortsession;
    }
    TimeDisplay();
});


// start timer on click
function startTimer(timerDisplay) {
    if (TimerIsRunning) {
        return; 
    }
    if (myInterval) {
        clearInterval(myInterval);
      }

    if (remainingTime === 0) {
        let timerDuration = timerDisplay.getAttribute("data-duration").split(":")[0];
        remainingTime = timerDuration * 60 * 1000;
    }

let endTimestamp = Date.now() + remainingTime;

myInterval = setInterval(function () {
    const timeRemaining = endTimestamp - Date.now();

    if (timeRemaining <= 0) {
      clearInterval(myInterval);
      timerDisplay.querySelector(".time").textContent = "00:00";
      TimerIsRunning = false;
      
      const alarm = new Audio("assets/alarm-327234.mp3");
      alarm.play();
    } 
    
    else {
      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      timerDisplay.querySelector(".time").textContent = formattedTime;
    }
  }, 1000);
  TimerIsRunning = true;
}

// start and resume function
function returnTimer() {
    if (myInterval) {
        clearInterval(myInterval);
        myInterval = null;
    }

    TimerIsRunning = false;
    remainingTime = 0;

    currentTimer = Array.from(timers).find(timer => timer.style.display === "block");
    if (currentTimer) {
        const originalTime = currentTimer.getAttribute("data-duration");
        currentTimer.querySelector(".time").textContent = originalTime;
    }
}

// Event listeners
startBtn.addEventListener("click", () => {
    currentTimer = Array.from(timers).find(timer => timer.style.display === "block");
    if (currentTimer) {
        startTimer(currentTimer);
    }
});

returnBtn.addEventListener("click", returnTimer);


