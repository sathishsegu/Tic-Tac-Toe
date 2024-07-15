let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    msg.innerText = "";
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                box.style.color = "#03045E";
            } else {
                box.innerText = "X";
                box.style.color = "#FF006E";
            }
            box.disabled = true;
            count++;
            turnO = !turnO;
        }

        let isWinner = checkWinner();
        if (isWinner) {
            showWinner(isWinner);
        } else if (count === 9) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "Game is Draw";
    msgContainer.classList.remove("hide");
    msg.style.color = "#F77F00";
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    msg.style.color = winner === "X" ? "#FF006E" : "#03045E";
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            return boxes[a].innerText;
        }
    }
    return null;
};

resetBtn.addEventListener("click", resetGame);
