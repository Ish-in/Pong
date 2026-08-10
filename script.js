const gameContainer = document.quetySelector('.game-container');
const ball = document.getElementById('ball');
const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
const leftScoreDisplay = document.getElementById('leftScore');
const rightScoreDisplay = document.getElementById('rightScore');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');

let ballX, ballY, ballSpeedX, ballSpeedY, leftPaddleY, rightPaddleY;
let leftPaddleSpeed = 0
let rightPaddleSpeed = 0;
let leftScore = 0;
let rightScore = 0;
const maxScore = 5;
const paddleSpeed = 6;
const paddleHeight = leftPaddle.clientHeight;
let isGameOver = false;
let ballSpeedIncreaseInterval;

function resetBall() {
ballX = gameContainer.clientWidth / 2 - ball.clientWidth / 2;
ballY = gameContainer.clientHeight / 2 - ball.clientHeight / 2;
ballSpeedX = 4 * (Math.random() < 0.5 ? 1 : -1);
ballSpeedY = 4 * (Math.random() < 0.5 ? 1 : -1);
}

function resetPaddles() {
leftPaddleY = gameContainer.clientHeight / 2 - leftPaddle.clientHeight / 2;
rightPaddleY = gameContainer.clientHeight / 2 - rightPaddle.clientHeight / 2;
}

function updateScores() {
leftScoreDisplay.textContent = leftScore;
rightScoreDisplay.textContent = rightScore;
}

function checkWinner() {
if (leftScore >= maxScore) {
winnerMessage.textContent = 'Left Player Wins!';
winnerMessage.style.display = 'block';
restartButton.style.display = 'block';
isGameOver = true;
} else if (rightScore >= maxScore) {
winnerMessage.textContent = 'Right Player Wins!';
winnerMessage.style.display = 'block';
restartButton.style.display = 'block';
isGameOver = true;
}
}

function restartGame() {
leftScore = 0;
rightScore = 0;
updateScores();
winnerMessage.style.display = 'none';
restartButton.style.display = 'none';
isGameOver = false;
resetBall();
resetPaddles();
ballSpeedIncreaseInterval = setInterval();
gameLoop();
}

function increaseBallSpeed() {
if (ballSpeedX > 0) {
ballSpeedX += 0.2;
} else {
ballSpeedX -= 0.2;
}
if (ballSpeedY > 0) {
ballSpeedY += 0.2;
} else {
ballSpeedY -= 0.2;
}
}

function startBallSpeedIncrease() {
    clearInterval(ballSpeedIncreaseInterval);
    ballSpeedIncreaseInterval = setInterval(increaseBallSpeed, 5000);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') { leftPaddleSpeed = -paddleSpeed; }
    if (e.key === 's') { leftPaddleSpeed = paddleSpeed; }
    if (e.key === 'ArrowUp') { rightPaddleSpeed = -paddleSpeed; }
    if (e.key === 'ArrowDown') { rightPaddleSpeed = paddleSpeed; }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 's') { leftPaddleSpeed = 0; }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { rightPaddleSpeed = 0; }
});

restartButton.addEventListener('click', restartGame);

function gameLoop() {
    if (isGameOver) return;
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballY <= 0 || ballY >= gameContainer.clientHeight - ball.clientHeight) {
        ballSpeedY *= -1;
    }
    if (ballX <= leftPaddle.clientWidth && ballY + ball.clientHeight >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
        ballSpeedX *= -1;
    }

    if (ballX + ball.clientWidth >= gameContainer.clientWidth - rightPaddle.clientWidth && ballY + ball.clientHeight >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
        ballSpeedX *= -1;
    }

    if (ballX <= 0) {
        rightScore++;
        if (checkWinner()) return;
        resetBall();
    }

    if (ballX + ball.clientWidth >= gameContainer.clientWidth) {
        leftscore++;
        if (checkWinner()) return;
        resetBall();
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    leftPaddleY += leftPaddleSpeed;
    rightPaddleY += rightPaddleSpeed;

    if (leftPaddleY < 0) leftPaddleY = 0;
    if (leftPaddleY > gameContainer.clientHeight - paddleHeight) leftPaddleY = gameContainer.clientHeight - paddleHeight;
    if (rightPaddleY < 0) rightPaddleY = 0;
    if (rightPaddleY > gameContainer.clientHeight - paddleHeight) rightPaddleY = gameContainer.clientHeight - paddleHeight;


    leftPaddle.style.top = `${leftPaddleY}px`;
    rightPaddle.style.top = `${rightPaddleY}px`;

    updateScores();

    requestAnimationFrame(gameLoop);
}

resetGame();