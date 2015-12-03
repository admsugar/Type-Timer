//read text file on page load
function onPageLoad() {
    var lines = GetLines("../Resources/Prompts.txt");
    UpdatePrompt(lines);
}

//file read
function GetLines(file) {
    var allText = "";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);

    if (allText != null) {
        return allText;
    }
}

//random prompt selection
function UpdatePrompt(lines) {

    var splitLines =  lines.split( '\n' );
    var randomLineNumber = Math.floor( Math.random() * splitLines.length );

    var box = document.getElementById("prompt");
    box.innerText = splitLines[randomLineNumber];

}

//todo:
function BeginTest() {

    initializeClock('clockdiv', deadline);
}



/* ============================================================
	Timer
============================================================ */

// set minutes
var mins = 1;
// calculate the seconds (don't change this! unless time progresses at a different speed for you...)
var seconds = mins * 60;
var begin = true;

function countdown() {
    setTimeout(Decrement, 1000);
}

function Decrement() {

    if (begin) {
        begin = false;

    }

    if (document.getElementById) {
        time = document.getElementById("timer");
        // if less than a minute remaining
        if (seconds < 59) {
            time.innerText = seconds;
        }
        seconds--;
        setTimeout(Decrement, 1000);
    }
}

function getminutes() {
    // minutes is seconds divided by 60, rounded down
    mins = Math.floor(secs / 60);
    return mins;
}

function getseconds() {
    // take mins remaining (as seconds) away from total seconds remaining
    return secs - Math.round(mins * 60);
}





function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = 'December 31 2015 00:00:50 UTC+0200';
initializeClock('clockdiv', deadline);