const states = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    value: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
};

function countDown(){
    states.value.currentTime--;
    states.view.timeLeft.textContent = states.value.currentTime;

    if(states.value.currentTime <= 0){
        clearInterval(states.value.countDownTimerId);
        clearInterval(states.value.timerId);
        alert("Game Over! O seu Resultado foi:" + states.value.result);

    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    states.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = states.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    states.value.hitPosition = randomSquare.id;
}

function moveEnemy(){
    states.value.timerId = setInterval(randomSquare, states.value.gameVelocity)
}

function addListenerHitBox(){
    states.view.square.forEach((square) =>{
        square.addEventListener("mousedown", () => {
          if(square.id === states.value.hitPosition) {
            states.value.result++
            states.view.score.textContent = states.value.result;
            states.value.hitPosition = null;
            playSound();
          } 
        })
    });
}

function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();