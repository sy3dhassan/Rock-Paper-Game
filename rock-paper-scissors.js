let score = JSON.parse(localStorage.getItem('score')) || {
                
    wins : 0,
    losses : 0,
    ties : 0,

};

updateScoreElement();


let isAutoPlaying = false;
let intervalId;
let autoPlayBtn = document.querySelector('.js-auto-play-btn');

autoPlayBtn.addEventListener('click', () => {
isAutoPlaying = !isAutoPlaying;
autoPlayBtn.textContent = isAutoPlaying ? 'Stop Playing' : 'Auto Play';
})

function autoPlay(){
   
      if (isAutoPlaying) {
        // Start autoplay logic
        intervalId = setInterval(() => {
           const playerMove = pickComputerMove();
               playGame(playerMove);
                }, 1000);

      } else {
        clearInterval(intervalId);
      }
    };

// function autoPlay(){

//     if (!isAutoPlaying){
//        intervalId = setInterval(function(){
//             const playerMove = pickComputerMove();
//             playGame(playerMove);
//         }, 1000);
//         isAutoPlaying = true;
//     } else {
//         clearInterval(intervalId);
//         isAutoPlaying = false;
//     }  
// }

document.querySelector(".js-rock-btn")
.addEventListener('click', ( ) => {
    playGame('rock')
});

document.querySelector(".js-paper-btn")
.addEventListener('click', () => {
    playGame('paper')
});

document.querySelector(".js-scissors-btn")
.addEventListener('click', () => {
    playGame('scissors')
});

document.querySelector('.js-auto-play-btn')
.addEventListener('click', () => {
    autoPlay();
})

document.querySelector('.js-reset-btn')
.addEventListener('click', ()=> {
    score.wins = 0,
    score.losses = 0,
    score.ties = 0;
    localStorage.removeItem('score')
    updateScoreElement();
})



document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r'){
        playGame('rock');
    } else if (event.key === 'p'){
        playGame('paper');
    } else if (event.key === 's'){
        playGame('scissors');
    } else if (event.key === 'Backspace'){
        score.wins = 0,
    score.losses = 0,
    score.ties = 0;
    localStorage.removeItem('score')
    updateScoreElement();
    }
});

function playGame(playerMove){

const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
       if (computerMove === 'rock') {
            result = 'You Lose';
        } else if (computerMove === 'paper') {
            result = 'You Win';
        } else {
            result = 'Tie';
        }
    
    } else if (playerMove === 'paper'){

            if (computerMove === 'rock') {
            result = 'You Win';
        } else if (computerMove === 'paper') {
            result = 'Tie';
        } else {
            result = 'You Lose';
        }
    }

    else if(playerMove === 'rock'){
                if (computerMove === 'rock') {
                result = 'Tie';
            } else if (computerMove === 'paper') {
                result = 'You Lose';
            } else {
                result = 'You Win';
            }
    }
    

    if (result === 'You Win'){
        score.wins += 1;
    } else if (result === 'You Lose'){
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties += 1;
    }


    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.result').
    innerHTML = result;

    document.querySelector('.moves').
    innerHTML =
        `You 
        <img src="/${playerMove}-emoji.png" class="move-icon">
        <img src="/${computerMove}-emoji.png" class="move-icon">
        Computer`
            };


            function updateScoreElement(){
document.querySelector('.js-score').innerHTML = `Wins : ${score.wins} Losses : ${score.losses} Ties : ${score.ties}`;

}

    function pickComputerMove(){
        const randomNumber = Math.random();

        let computerMove = '';



        if (randomNumber >= 0 && randomNumber < 1 / 3) {
            computerMove = 'rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3){
            computerMove = 'paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1){
            computerMove = 'scissors';
        }
        return computerMove;
    }