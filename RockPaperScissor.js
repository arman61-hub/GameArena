let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const resetBtn = document.getElementById("reset-btn");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
}

const drawGame = () => {
    console.log("game was draw.");
    msg.innerText = "Game was Draw. Play again.";
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        if(userScore>compScore){
            userScorePara.style.color = "green";
            compScorePara.style.color = "red";
        }
        else if(userScore===compScore){
            userScorePara.style.color = "#081b31";
            compScorePara.style.color = "#081b31";
        }
        console.log("you win!");
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        compScore++;
        compScorePara.innerText = compScore;
        if(userScore<compScore){
            userScorePara.style.color = "red";
            compScorePara.style.color = "green";
        }
        else if(userScore===compScore){
            userScorePara.style.color = "#081b31";
            compScorePara.style.color = "#081b31";
        }
        console.log("you lose!");
        msg.innerText = `You Lose! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const playGame = (userChoice) => {
    console.log("user choice = ",userChoice);
    // Generate computer choice 
    const compChoice = genCompChoice();
    console.log("comp choice = ",compChoice);

    if(userChoice===compChoice){
        // Draw Game 
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice === "rock"){
            // scissors , paper
            userWin = (compChoice === "paper") ? false : true; 
        }
        else if(userChoice === "paper"){
            // rock  , scissors
            userWin = (compChoice === "scissors") ? false : true; 
        }
        else {
            // rock , paper
            userWin = (compChoice === "rock") ? false : true; 
        }
        showWinner(userWin,userChoice,compChoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Reset game function
const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    userScorePara.style.color = "#081b31";
    compScorePara.style.color = "#081b31";
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";
}

resetBtn.addEventListener("click", resetGame);