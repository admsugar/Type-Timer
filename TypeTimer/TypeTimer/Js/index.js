/* ============================================================
    File IO
============================================================ */

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



/* ============================================================
    Main driver
============================================================ */
function BeginTest() {

    initializeClock('clockdiv');
}



/* ============================================================
	Timer
============================================================ */
function initializeClock(id) {
    date = new Date().toJSON().slice(0, 10)
    endtime = 'December 31 2015 00:00:50 UTC+0200';
    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    //var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    //var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
    };
}
