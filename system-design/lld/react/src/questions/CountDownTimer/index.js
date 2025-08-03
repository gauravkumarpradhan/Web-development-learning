(function () {
    const hoursInputRef = document.getElementById("hours-id");
    const minutesInputRef = document.getElementById("minutes-id");
    const secondsInputRef = document.getElementById("seconds-id");
    const pauseBtn = document.getElementById("pause");
    const startBtn = document.getElementById("start");
    const resumeBtn = document.getElementById("resume");
    pauseBtn.style.display = "none";
    resumeBtn.style.display = "none";
    let intervalRef;

    function validateTimingItems() {
        let seconds = Number(secondsInputRef.value);
        let minutes = Number(minutesInputRef.value);
        let hours = Number(hoursInputRef.value);

        if (seconds >= 60) {
            minutes += Math.floor(seconds / 60);
            seconds = seconds % 60;
        }
        if (minutes >= 60) {
            hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
        }

        secondsInputRef.value = seconds;
        minutesInputRef.value = minutes;
        hoursInputRef.value = hours;
    }

    function triggerTimer() {
        validateTimingItems();
        intervalRef = setInterval(function () {
            let seconds = Number(secondsInputRef.value);
            let minutes = Number(minutesInputRef.value);
            let hours = Number(hoursInputRef.value);

            if (!seconds && !minutes && !hours) clearInterval(intervalRef);

            if (seconds) seconds--;

            if (!seconds && minutes) {
                minutes--;
                seconds = 59;
            }

            if (!minutes && hours) {
                hours--;
                minutes = 59;
                seconds = 59;
            }

            secondsInputRef.value = seconds / 10 > 1 ? seconds : "0" + seconds;
            minutesInputRef.value = minutes / 10 > 1 ? minutes : "0" + minutes;
            hoursInputRef.value = hours / 10 > 1 ? hours : "0" + hours;
        }, 1000);
    }

    document.getElementById("resume").addEventListener("click", function () {
        clearInterval(intervalRef);
        resumeBtn.style.display = "none";
        pauseBtn.style.display = "block";
    });

    document.getElementById("pause").addEventListener("click", function () {
        clearInterval(intervalRef);
        resumeBtn.style.display = "block";
        pauseBtn.style.display = "none";
    });

    document.getElementById("start").addEventListener("click", function () {
        triggerTimer();
        startBtn.style.display = "none";
        pauseBtn.style.display = "block";
    });

    document.getElementById("reset").addEventListener("click", function () {
        clearInterval(intervalRef);
        pauseBtn.style.display = "none";
        resumeBtn.style.display = "none";
        hoursInputRef.value = "00";
        minutesInputRef.value = "00";
        secondsInputRef.value = "00";
    });
})();
