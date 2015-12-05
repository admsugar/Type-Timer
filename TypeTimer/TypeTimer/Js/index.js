/* ============================================================
    Globals
============================================================ */
var promptStringSplit = null;
var currentWord = "";
var currentWordIndex = -1;
var firstKeyEntry = false;
var lastWord = false; 

var prompt;
var entry;

/* ============================================================
    Stats
============================================================ */
var wordsTypedCorrectly = 0;

/* ============================================================
    File IO
============================================================ */
//read text file on page load
function onPageLoad() {

    prompt = document.getElementById("prompt");
    entry = document.getElementById("entry");

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

    var prompt = document.getElementById("prompt");

    var splitLines =  lines.split( '\n' );
    var randomLineNumber = Math.floor( Math.random() * splitLines.length );
    var promptString = splitLines[randomLineNumber];
    promptStringSplit = promptString.split(' ');

    currentWord = promptStringSplit[0];
    currentWordIndex = 0;

    promptStringSplit[currentWordIndex] = '<span style="background-color: #ADD8E6">' + currentWord + '</span>';

    var joinedPromptString = promptStringSplit.join(' ');
    prompt.innerHTML = joinedPromptString;
}

/* ============================================================
    Main driver
============================================================ */
function BeginTest(event) {

    if (!firstKeyEntry) {
        firstKeyEntry = true;
        initializeClock('clockdiv');
    }

    var prevWord;
    var prevWordIndex; 
    if (event.which == 32) {

        CompareAndUpdate();
        entry.value = "";
    }

    if (lastWord) {
        FinishTest();
    }
}

function CompareAndUpdate() {

    if (currentWordIndex === (promptStringSplit.length - 1)) {
        lastWord = true;
    }

    //update current word to red or green 
    var areEqual = currentWord.toUpperCase().trim() === entry.value.toUpperCase().trim();

    if (areEqual) {
        promptStringSplit[currentWordIndex] = promptStringSplit[currentWordIndex].replace("#ADD8E6", "#4CBB17");
    }
    else {
        promptStringSplit[currentWordIndex] = promptStringSplit[currentWordIndex].replace("#ADD8E6", "#FF3232");
    }

    //nextWord update to blue
    if (!lastWord) {
        currentWordIndex++;
        currentWord = promptStringSplit[currentWordIndex];
        promptStringSplit[currentWordIndex] = '<span style="background-color:#ADD8E6">' + currentWord + '</span>';
    }
    
    //update dom only once per call
    var joinedPromptString = promptStringSplit.join(' ');
    prompt.innerHTML = joinedPromptString;
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

    entry.readOnly = true;
    entry.placeholder = "Results displayed below. Play again?"
}