let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "sky", "purple"];

let gameRunning = false;
let level = 0;

let h2 = document.querySelector('h2');


// High score
let highestScore=localStorage.getItem("highestScore") || 0;
// updateScoreDisplay();

// start game
document.addEventListener("click", function () {
    if (gameRunning == false) {
        console.log("Game is Started");
        gameRunning = true;
        levelUp();
    }
});

// btn flash
function gameFlash(btn) {
    btn.classList.add('gameFlash');
    setTimeout(function () {
        btn.classList.remove('gameFlash')
    }, 250);
}
function userFlash(btn) {
    btn.classList.add('userFlash');
    setTimeout(function () {
        btn.classList.remove('userFlash')
    }, 250);
}


// level1 
function levelUp() {
    userSeq = [];
    level++;
    updateScoreDisplay();

    // h2.innerText = `Level: ${level}`;

    // random button 
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    // let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    // gameFlash(randBtn);
    flashGameSequence();
};


// entire gamesquence flash
function flashGameSequence(){
    gameSeq.forEach((color,index)=>{
        let btn=document.querySelector(`.${color}`);
        setTimeout(()=>{
            gameFlash(btn);
        },600*index+500);
    });
}


// Color matching
function checkColor(idx) {
    // console.log(`current level- ${level}`);

    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            let correct = new Audio("correct.mp3");
        correct.play();
            setTimeout(levelUp, 1000);
        }
    } else {
        let beep = new Audio("beep.mp3");
        beep.play();

        updateHighScore();
        
        h2.innerHTML = `Game over! Level: ${level-1} | <b>Highest Score: ${highestScore}</b> </br> press any key to start again`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 150)
        setTimeout(() => {
            reset();
        }, 50);
        // reset();
    }
};


//button event

function btnPress() {
    // console.log(this)
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkColor(userSeq.length - 1);
};

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns) {
    btn.addEventListener("click", btnPress)
}


//game reset
function reset() {
    gameRunning = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function updateHighScore(){
    if(highestScore<level){
       highestScore=level-1;
       localStorage.setItem("Highest Score", highestScore);
    }

}
function updateScoreDisplay() {
  h2.innerText = `Level: ${level} | Highest Score: ${highestScore}`;
}
