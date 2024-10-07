let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let printMsg = document.querySelector("#print");

let turnX = true; // playerX, playerO
let count = 0; // To Track Draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Initialize the game state
const initGame = () => {
    printMsg.innerText = `It's Player X's turn`; // Starting message
};

const resetGame = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    printMsg.innerText = `It's Player X's turn`; // Reset message
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX) {
            box.innerText = "X";
            turnX = false;
            printMsg.innerText = `It's Player O's turn`; // Update turn message
        } else {
            box.innerText = "O";
            turnX = true;
            printMsg.innerText = `It's Player X's turn`; // Update turn message
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    printMsg.innerText = `Game was a Draw`;
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    printMsg.innerText = `Congratulations, Winner is ${winner}`;
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

// Initialize the game on page load
initGame();

resetBtn.addEventListener("click", resetGame);