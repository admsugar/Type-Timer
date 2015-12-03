/* ============================================================
    Globals
============================================================ */
var promptString = "";
var promptStringSplit = null;
var previousWord = "";
var currentWord = "";
var currentWordIndex = -1;
var promptWordCount = -1;
var newWord = "";

/* ============================================================
    Stats
============================================================ */
var wordsTypedCorrectly = 0;


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
    var prompt = document.getElementById("prompt");

    promptString = splitLines[randomLineNumber];
    promptStringSplit = promptString.split(' ');

    currentWord = promptStringSplit[0];
    currentWordIndex = 0;
    promptWordCount = splitLines.length;

    newWord = '<span style="background-color:#ADD8E6">' + currentWord + '</span>';
    var replacedString = promptString.replace(currentWord, newWord);

    prompt.innerHTML = replacedString; 

    
}


var first = false;
/* ============================================================
    Main driver
============================================================ */
function BeginTest(event) {

    var entry = document.getElementById("entry");
    var prompt = document.getElementById("prompt");

    if (event.which == 32) {

        previousWord = newWord;
        currentWordIndex++;

        var currentTyped = entry.value;
        entry.value = "";
        if (currentTyped == currentWord) {

            currentWord = promptStringSplit[currentWordIndex];
            wordsTypedCorrectly++;

            prompt.innerHTML = prompt.innerHTML.replace("#ADD8E6", "#4CBB17");

            newWord = '<span style="background-color:#ADD8E6">' + currentWord + '</span>';
            prompt.innerHTML = prompt.innerHTML.replace(currentWord, newWord);

        }
        else {

            currentWord = promptStringSplit[currentWordIndex];
            prompt.innerHTML = prompt.innerHTML.replace("#ADD8E6", "#FF3232");

            newWord = '<span style="background-color:#ADD8E6">' + currentWord + '</span>';
            prompt.innerHTML = prompt.innerHTML.replace(currentWord, newWord);
        }
    }
    
    if (!first) {
        first = true;
        initializeClock('clockdiv');
    }
}



var timerFirst = false;
/* ============================================================
	Timer
============================================================ */
function initializeClock(id) {
    var oneMinuteLater = new Date();
    oneMinuteLater.setMinutes(oneMinuteLater.getMinutes() + 1);

    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(oneMinuteLater);

        if (timerFirst && t.seconds == 0) {
            timerFirst = true;
            FinishTest();
        }

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }

        timerFirst = true;
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

function FinishTest() {

}