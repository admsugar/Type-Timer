function onPageLoad() {
    var lines = GetLines("../Resources/Prompts.txt");
    UpdatePrompt(lines);
}

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

function UpdatePrompt(lines) {

    var splitLines =  lines.split( '\n' );
    var randomLineNumber = Math.floor( Math.random() * splitLines.length );

    var box = document.getElementById("prompt");
    box.innerText = splitLines[randomLineNumber];

}

function BeginTest() {

    alert("here");
    //countdown();
}


// set minutes
var mins = 3;
// calculate the seconds (don't change this! unless time progresses at a different speed for you...)
var secs = mins * 60;

function countdown() {
    setTimeout('Decrement()', 1000);
}

function Decrement() {
    if (document.getElementById) {
        minutes = document.getElementById("minutes");
        seconds = document.getElementById("seconds");
        // if less than a minute remaining
        if (seconds < 59) {
            seconds.value = secs;
        } else {
            minutes.value = getminutes();
            seconds.value = getseconds();
        }
        secs--;
        setTimeout('Decrement()', 1000);
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