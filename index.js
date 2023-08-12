var pickedColors = [];
var showedColors = [];
var levelNr = 1;
var startElement = document.getElementsByTagName("h1")[0];
var timeForPlayer = levelNr * 4000;

startElement.addEventListener("click", startGame);

function timer(ms) { return new Promise(res => setTimeout(res, ms)); }

async function startGame() {
    startElement.innerHTML = "Level " + levelNr;
    showedColors.push(generateRandomColor());
    await showRandomColors();
    addEventListenerToButtons();
    await timer(timeForPlayer);
    checkAllUserInputs();
}

function addEventListenerToButtons() {
    for(i=0; i < 4; i++) {
        document.getElementsByClassName("box")[i].addEventListener("click", buttonEventHandler);
    }
}

function buttonEventHandler(){
    pickedColors.push(this.innerHTML);
    displayUserPushAnimation();
    checkUserInput();
}

function checkUserInput() {
    for(n=1; n == levelNr; n++) {
        var showedBoxHTML = document.getElementsByClassName(showedColors[n - 1])[0].innerHTML;
        var pickedBoxHTML = document.getElementsByClassName(pickedColors[n - 1])[0].innerHTML;
        if(showedBoxHTML !== pickedBoxHTML) {
            resetGame();
        }
    }
}

function areButtonArraysTheSame() {
    if(showedColors.length !== pickedColors.length || pickedColors.length == 0) {
        return false;
    }
    if(showedColors.toString() !== pickedColors.toString()) {
        return false;
    }
    else {
        return true;
    }
}

function checkAllUserInputs() {
    if(areButtonArraysTheSame() == false) {
        resetGame();
    }
    else {
        levelNr++;
        console.log("To the next level " + levelNr);
        pickedColors = [];
        startGame();
    }
}

function resetGame() {
    startElement.innerHTML = "Game Over";
    levelNr = 1;
    showedColors = [];
    pickedColors = [];
}

function generateRandomColor() {
    var randomNr = Math.floor((Math.random() * 4) + 1);
    return randomNr;
}

async function showRandomColors() {
    for (i=0; i<this.showedColors.length; i++) {
        animateButton(showedColors, i);
        await timer(2000);
    }
}

function animateButton(array, i) {
    var getBox = document.getElementsByClassName(array[i])[0];
    getBox.classList.add("pressed");
    setTimeout(function() {
        getBox.classList.remove("pressed");
    }, 1000);
}


// TODO: refactor after eventhandler
function displayUserPushAnimation() {
    var whichButton = this.pickedColors[pickedColors.length -1];
    var getUserBox = document.getElementsByClassName(whichButton)[0];
    getUserBox.classList.add("pressed");
    setTimeout(function() {
        getUserBox.classList.remove("pressed");
    }, 1000);
}


// TODO: add Sounds and add arrow keys as User Input
/*   These functions don't work
function addEventListenerForArrowKeys() {
    document.addEventListener("keydown", function(event){
        arrowKeyEventHandler(event.key);
    });
}

function arrowKeyEventHandler(key) {
    switch (key) {
        case "ArrowUp":
            pickedColors.push(1);
            displayUserPushAnimation();
            checkUserInput();
            break;

        case "ArrowLeft":
            pickedColors.push(2);
            displayUserPushAnimation();
            checkUserInput();
            break;
    
        case "ArrowRigth":
            pickedColors.push(3);
            displayUserPushAnimation();
            checkUserInput();
            break;

        case "ArrowDown":
            pickedColors.push(4);
            displayUserPushAnimation();
            checkUserInput();
            break;
    }
}*/


