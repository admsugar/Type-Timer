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

    countdown();
}



/* ============================================================
	Timer
============================================================ */

// set minutes
var mins = 1;
// calculate the seconds (don't change this! unless time progresses at a different speed for you...)
var seconds = mins * 60;

function countdown() {
    setTimeout(Decrement, 1000);
}

function Decrement() {
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