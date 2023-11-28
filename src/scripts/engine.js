const state ={
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        score: document.querySelector("#score"),
        timeLeft: document.querySelector("#time-left")
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    action: {
        timerId: setInterval(randomSquare,700),
        countDownTimeId: setInterval(countDown,1000),
    },
};

function playSound(name){
    let audio = new Audio(`./src/audios/${name}.m4a`);
    audio.volume = .2;
    audio.play();
}

function countDown(){
    state.values.currentTime --;    
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0){
        clearInterval(state.action.timerId);
        clearInterval(state.action.countDownTimeId);
        playSound("win");
        alert("Gane Over!: "+ state.values.result);
    }
}

function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy")
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) =>{
        square.addEventListener("mousedown",() =>{
            if(square.id === state.values.hitPosition){
                state.values.result += 1
                playSound("hit");
                state.view.score.textContent = state.values.result;
                
                state.values.hitPosition = null
            }

        })
    });
}

function init(){

   addListenerHitBox()
}

init();