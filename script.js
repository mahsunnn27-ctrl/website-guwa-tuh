const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const countdown = document.getElementById("countdown");
const scoreText = document.getElementById("score");

const box = 20;

let isPaused = false;
let snake;
let food;

let direction;
let nextDirection;

let score;

let game;

let isPlaying = false;


/* =========================
   MULAI GAME
========================= */

function startGame() {

    clearInterval(game);

    isPaused = false;

document.getElementById("pauseButton").textContent =
    "⏸️ STOP";

    snake = [
        {
            x: 200,
            y: 200
        }
    ];

    food = createFood();

    direction = "RIGHT";
    nextDirection = "RIGHT";

    score = 0;

    scoreText.textContent = score;

    isPlaying = false;

    countdown.style.display = "flex";

    startCountdown();
}


/* =========================
   ABA-ABA MULAI
========================= */

function startCountdown() {

    let count = 3;

    countdown.textContent = count;

    let timer = setInterval(function() {

        count--;

        if (count > 0) {

            countdown.textContent = count;

        }

        else {

            countdown.textContent = "MULAI!";

            setTimeout(function() {

                countdown.style.display = "none";

                isPlaying = true;

                game = setInterval(drawGame, 100);

            }, 500);

            clearInterval(timer);
        }

    }, 1000);
}


/* =========================
   MAKANAN
========================= */

function createFood() {

    let newFood;

    do {

        newFood = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };

    } while (
        snake &&
        snake.some(part =>
            part.x === newFood.x &&
            part.y === newFood.y
        )
    );

    return newFood;
}


/* =========================
   KONTROL
========================= */

document.addEventListener("keydown", function(event) {

    if (!isPlaying) return;


    if (
        event.key === "ArrowLeft" &&
        direction !== "RIGHT"
    ) {

        nextDirection = "LEFT";

    }


    if (
        event.key === "ArrowUp" &&
        direction !== "DOWN"
    ) {

        nextDirection = "UP";

    }


    if (
        event.key === "ArrowRight" &&
        direction !== "LEFT"
    ) {

        nextDirection = "RIGHT";

    }


    if (
        event.key === "ArrowDown" &&
        direction !== "UP"
    ) {

        nextDirection = "DOWN";

    }

});


/* =========================
   GAME
========================= */

function drawGame() {

    /* Background */

    ctx.fillStyle = "#8bac0f";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* Arah baru */

    direction = nextDirection;


    /* Makanan */

    ctx.fillStyle = "#0f380f";

    ctx.fillRect(
        food.x,
        food.y,
        box,
        box
    );


    /* Ular */

    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle =
            i === 0
                ? "#0f380f"
                : "#306230";

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box,
            box
        );

    }


    /* Posisi kepala */

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    /* Gerakan */

    if (direction === "LEFT") {

        snakeX -= box;

    }

    if (direction === "UP") {

        snakeY -= box;

    }

    if (direction === "RIGHT") {

        snakeX += box;

    }

    if (direction === "DOWN") {

        snakeY += box;

    }


    /* =========================
       TEMBUS TEMBOK
    ========================= */

    if (snakeX < 0) {

        snakeX = canvas.width - box;

    }

    if (snakeX >= canvas.width) {

        snakeX = 0;

    }

    if (snakeY < 0) {

        snakeY = canvas.height - box;

    }

    if (snakeY >= canvas.height) {

        snakeY = 0;

    }


    /* Kepala baru */

    let newHead = {
        x: snakeX,
        y: snakeY
    };


    /* =========================
       TABRAK BADAN SENDIRI
    ========================= */

    if (collision(newHead, snake)) {

        gameOver();

        return;
    }


    /* =========================
       MAKAN
    ========================= */

    if (
        snakeX === food.x &&
        snakeY === food.y
    ) {

        score += 10;

        scoreText.textContent = score;

        food = createFood();

    }

    else {

        snake.pop();

    }


    snake.unshift(newHead);

}


/* =========================
   CEK TABRAKAN BADAN
========================= */

function collision(head, body) {

    for (let i = 0; i < body.length; i++) {

        if (
            head.x === body[i].x &&
            head.y === body[i].y
        ) {

            return true;

        }

    }

    return false;
}


/* =========================
   GAME OVER
========================= */

function gameOver() {

    isPlaying = false;

    clearInterval(game);

    document.getElementById("premiumPopup").style.display = "flex";

}




/* =========================
   MULAI LAGI
========================= */

function restartGame() {

    startGame();

}


/* =========================
   MULAI PERTAMA
========================= */

startGame();
function playAgain() {

    document.getElementById("premiumPopup").style.display = "none";

    startGame();

}
function togglePause() {

    // Kalau game sedang berhenti
    if (isPaused) {

        isPaused = false;

        document.getElementById("pauseButton").textContent =
            "⏸️ STOP";

        // Lanjutkan game
        game = setInterval(drawGame, 100);

    }

    // Kalau game sedang berjalan
    else {

        isPaused = true;

        document.getElementById("pauseButton").textContent =
            "▶️ LANJUTKAN";

        // Hentikan gerakan ular
        clearInterval(game);
    }

}