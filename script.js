const gameContainer = document.querySelector('.game-container');
const ball = document.getElementById('ball');
const leftPaddle = document.getElementById('LeftPaddle');
const rightPaddle = document.getElementById('RightPaddle');
const leftScoreDisplay = document.getElementById('LeftScore');
const rightScoreDisplay = document.getElementById('RightScore');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');

let ballX = 0;
let ballY = 0;
let ballSpeedX = 4;
let ballSpeedY = 4;

let leftPaddleY = 0;
let rightPaddleY = 0;

let leftPaddleSpeed = 0;
let rightPaddleSpeed = 0;

let leftScore = 0;
let rightScore = 0;

const maxScore = 5;
const paddleSpeed = 6;

let isGameOver = false;
let ballSpeedIncreaseInterval = null;

function resetBall() {
ballX = gameContainer.clientWidth / 2 - ball.clientWidth / 2;
ballY = gameContainer.clientHeight / 2 - ball.clientHeight / 2;

```
ballSpeedX = Math.random() < 0.5 ? 4 : -4;
ballSpeedY = Math.random() < 0.5 ? 4 : -4;

ball.style.left = ballX + 'px';
ball.style.top = ballY + 'px';
```

}

function resetPaddles() {
leftPaddleY =
gameContainer.clientHeight / 2 -
leftPaddle.clientHeight / 2;

```
rightPaddleY =
    gameContainer.clientHeight / 2 -
    rightPaddle.clientHeight / 2;

leftPaddle.style.top = leftPaddleY + 'px';
rightPaddle.style.top = rightPaddleY + 'px';
```

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
clearInterval(ballSpeedIncreaseInterval);
return true;
}

```
if (rightScore >= maxScore) {
    winnerMessage.textContent = 'Right Player Wins!';
    winnerMessage.style.display = 'block';
    restartButton.style.display = 'block';
    isGameOver = true;
    clearInterval(ballSpeedIncreaseInterval);
    return true;
}

return false;
```

}

function increaseBallSpeed() {
if (ballSpeedX > 0) {
ballSpeedX += 0.2;
} else {
ballSpeedX -= 0.2;
}

```
if (ballSpeedY > 0) {
    ballSpeedY += 0.2;
} else {
    ballSpeedY -= 0.2;
}
```

}

function startBallSpeedIncrease() {
clearInterval(ballSpeedIncreaseInterval);
ballSpeedIncreaseInterval = setInterval(
increaseBallSpeed,
5000
);
}

function restartGame() {
leftScore = 0;
rightScore = 0;
isGameOver = false;

```
winnerMessage.style.display = 'none';
restartButton.style.display = 'none';

updateScores();
resetBall();
resetPaddles();
startBallSpeedIncrease();

requestAnimationFrame(gameLoop);
```

}

document.addEventListener('keydown', function (e) {
if (e.key === 'w' || e.key === 'W') {
leftPaddleSpeed = -paddleSpeed;
}

```
if (e.key === 's' || e.key === 'S') {
    leftPaddleSpeed = paddleSpeed;
}

if (e.key === 'ArrowUp') {
    rightPaddleSpeed = -paddleSpeed;
}

if (e.key === 'ArrowDown') {
    rightPaddleSpeed = paddleSpeed;
}
```

});

document.addEventListener('keyup', function (e) {
if (
e.key === 'w' ||
e.key === 'W' ||
e.key === 's' ||
e.key === 'S'
) {
leftPaddleSpeed = 0;
}

```
if (
    e.key === 'ArrowUp' ||
    e.key === 'ArrowDown'
) {
    rightPaddleSpeed = 0;
}
```

});

restartButton.addEventListener('click', restartGame);

function gameLoop() {
if (isGameOver) {
return;
}

```
ballX += ballSpeedX;
ballY += ballSpeedY;

if (
    ballY <= 0 ||
    ballY + ball.clientHeight >= gameContainer.clientHeight
) {
    ballSpeedY *= -1;
}

if (
    ballX <= leftPaddle.clientWidth &&
    ballX + ball.clientWidth >= 0 &&
    ballY + ball.clientHeight >= leftPaddleY &&
    ballY <= leftPaddleY + leftPaddle.clientHeight
) {
    ballX = leftPaddle.clientWidth;
    ballSpeedX = Math.abs(ballSpeedX);
}

if (
    ballX + ball.clientWidth >=
        gameContainer.clientWidth - rightPaddle.clientWidth &&
    ballY + ball.clientHeight >= rightPaddleY &&
    ballY <= rightPaddleY + rightPaddle.clientHeight
) {
    ballX =
        gameContainer.clientWidth -
        rightPaddle.clientWidth -
        ball.clientWidth;

    ballSpeedX = -Math.abs(ballSpeedX);
}

if (ballX + ball.clientWidth < 0) {
    rightScore++;
    updateScores();

    if (checkWinner()) {
        return;
    }

    resetBall();
}

if (ballX > gameContainer.clientWidth) {
    leftScore++;
    updateScores();

    if (checkWinner()) {
        return;
    }

    resetBall();
}

ball.style.left = ballX + 'px';
ball.style.top = ballY + 'px';

leftPaddleY += leftPaddleSpeed;
rightPaddleY += rightPaddleSpeed;

if (leftPaddleY < 0) {
    leftPaddleY = 0;
}

if (
    leftPaddleY >
    gameContainer.clientHeight - leftPaddle.clientHeight
) {
    leftPaddleY =
        gameContainer.clientHeight - leftPaddle.clientHeight;
}

if (rightPaddleY < 0) {
    rightPaddleY = 0;
}

if (
    rightPaddleY >
    gameContainer.clientHeight - rightPaddle.clientHeight
) {
    rightPaddleY =
        gameContainer.clientHeight - rightPaddle.clientHeight;
}

leftPaddle.style.top = leftPaddleY + 'px';
rightPaddle.style.top = rightPaddleY + 'px';

requestAnimationFrame(gameLoop);
```

}

restartButton.style.display = 'none';

resetBall();
resetPaddles();
updateScores();
startBallSpeedIncrease();

requestAnimationFrame(gameLoop);
