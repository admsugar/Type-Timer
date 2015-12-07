/* ============================================================
    Globals
============================================================ */

//doesn't get reset
var lines = "";

var promptStringSplit = null;
var currentWord = "";
var currentWordIndex = -1;

var firstKeyEntry = false;
var lastWord = false; 
var testFinished = false;

var resetClick = false;
var refreshClick = false;

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
function OnPageLoad() {

    prompt = document.getElementById("prompt");
    entry = document.getElementById("entry");

    //only load this doc once TODO: make this more efficient so we dont load whole big doc
    lines = GetLines("../Resources/Prompts.txt");    
    UpdatePrompt();
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
var randomLineNumber = -1;
var splitLines = "";
//random prompt selection
function UpdatePrompt() {

    var prompt = document.getElementById("prompt");

    if (!refreshClick) {
        splitLines = lines.split('\n');
        randomLineNumber = Math.floor(Math.random() * splitLines.length);
    }
    var promptString = splitLines[randomLineNumber].trim();
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

        resetClick = false;
        firstKeyEntry = true;
        InitializeClock('clockdiv');
    }

    var prevWord;
    var prevWordIndex; 
    if (event.which == 32 || event.which == 13) {
        CompareAndUpdate();
        entry.placeholder = "Type away...";
        entry.value = null;
        event.stopPropagation();
        event.preventDefault();
    }

    if (testFinished || lastWord) {
        FinishTest();
    }
}

function CompareAndUpdate() {
    if (testFinished) {
        return;
    }

    if (currentWordIndex === (promptStringSplit.length - 1)) {
        lastWord = true;
    }

    //update current word to red or green 
    var areEqual = currentWord.toUpperCase().trim() === entry.value.toUpperCase().trim();

    if (areEqual) {
        wordsTypedCorrectly++;
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
    prompt.innerHTML = promptStringSplit.join(' ');
}

/* ============================================================
	Timer
============================================================ */
function InitializeClock(id) {
    var oneMinuteLater = new Date();
    oneMinuteLater.setMinutes(oneMinuteLater.getMinutes() + 1);

    var clock = document.getElementById(id);

    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function UpdateClock() {
        if (testFinished || resetClick) {
            minutesSpan.innerHTML = "01";
            secondsSpan.innerHTML = "00";

            clearInterval(timeinterval);
            return;
        }

        var t = GetTimeRemaining(oneMinuteLater);

        //time up
        if (t.minutes === 0 && t.seconds === 0) {
            FinishTest();
        }

        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    UpdateClock();
    var timeinterval = setInterval(UpdateClock, 1000);
}

function GetTimeRemaining(endtime) {
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


/* ============================================================
	Time Up/All words typed
============================================================ */

function FinishTest() {
 
    $("#clockdiv").animate({
        "margin-left": "0%", 
        "margin-right": "35%",
    }, 1000);

    //update score
    var scoreString = "";
    var wordsPerMinute = (wordsTypedCorrectly / 60); 
    var wordAccuracy = (wordsTypedCorrectly / (promptStringSplit.length - 1));

    scoreString += "<h1>Words Correct: </h1> " + wordsTypedCorrectly + " out of " + (promptStringSplit.length-1) + " words." +  "<br>" + "<h1>Words Per Minute: </h1> " + wordsPerMinute + "<br>" + "<h1>Word Accuracy: </h1> " + wordAccuracy; 

    var s = document.getElementById("score");
    s.innerHTML = scoreString; 
    $("#score").show(1000);

    //user finished prompt before time ended 
    testFinished = true;

    //disable key input
    entry.readOnly = true;
    entry.placeholder = "Results displayed below. Play again?";
    entry.stopPropagation();
    entry.preventDefault();
}


/* ============================================================
	Refresh Button or Next Prompt Clicked
============================================================ */

var stopTimer;
function ButtonClicked(event) {

    if (testFinished) {
        //clear the scoreboard info
        $("#score").hide(1000);
        $("#clockdiv").animate({
            "margin-left": "35%",
        }, 1000);
    }

    resetClick = true;

    event.value = "";

    if (event.target.className === "refresh") {
        refreshClick = true;
    }

    UpdatePrompt();

    entry.readOnly = false;
    entry.placeholder = "To start the test, begin typing here.";
    firstKeyEntry = false;

    lastWord = false;
    testFinished = false;

}

