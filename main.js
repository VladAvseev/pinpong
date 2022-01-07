//Счёт
let player1_score = 0;
let player2_score = 0;
let solo_score = 0;
/////////////////////////////////////

//Старт
let start_2_players_btn = document.getElementById("2_players");
start_2_players_btn.addEventListener("click", start_2_players_game);

let start_solo_btn = document.getElementById("1_player");
start_solo_btn.addEventListener("click", start_solo_game);

let game_is_started = false;
let is_solo_game = false;
let is_2_players_game = false;

function start_solo_game() {
    if (!game_is_started) {
        create_ball();

        document.getElementById(":").innerText = solo_score;
        document.getElementById(":").style.marginLeft = 70 + "px";

        game_is_started = true;
        is_solo_game = true;
    }
}

function start_2_players_game() {
    if (!game_is_started) {
        create_ball();

        document.getElementById("player1_score").innerText = player1_score;
        document.getElementById("player2_score").innerText = player2_score;
        document.getElementById(":").innerText = ":";

        document.getElementById("player1_score").style.marginLeft = 50 + "px";

        game_is_started = true;
        is_2_players_game = true
    }
}
////////////////////////////////////////////////////////////

//Пермещение игроков
let SPEED = 7  ;
let up1 = 87, down1 = 88, up2 = 73, down2 = 77;
let dirs = {[up1]: 0, [down1]: 0, [up2]: 0, [down2]: 0};

let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");

let cs1 = window.getComputedStyle(player1);
let cs2 = window.getComputedStyle(player2);

let top1 = parseInt(cs1.top);
let top2 = parseInt(cs2.top);

document.addEventListener('keydown', event => {
    dirs[event.keyCode] = 1;
});

document.addEventListener('keyup', event => {
    dirs[event.keyCode] = 0;
});

setInterval(function() {
    if (game_is_started) {
        if (top1 > 0) {top1 -= dirs[up1] * SPEED;}
        if (top1 < 300) {top1 += dirs[down1] * SPEED;}
        if (top2 > 0) {top2 -= dirs[up2] * SPEED;}
        if (top2 < 300) {top2 += dirs[down2] * SPEED;}

        player1.style.top = top1 + "px";
        player2.style.top = top2 + "px";
    }
}, 25)
////////////////////////////////////////////////////////

//Механика мяча
let direction_x = 1;
let direction_y = 1;
let left_speed = 5;
let top_speed = 0;

setInterval(function() {
    let ball = document.getElementById("ball")

    let cs = window.getComputedStyle(ball);

    let left = parseInt(cs.left);
    let top = parseInt(cs.top);

    //Перемещение мача
    if (left <= 560 && left >= 0) {
        left += direction_x * left_speed ;
        ball.style.left = left + "px";
        top += direction_y * top_speed;
        ball.style.top = top + "px";
    }

    //Условие отбивания мяча игроком
    if (left === 550 && top2 > top - 115 && top2 < top + 15 || left === 10 && top1 > top - 115 && top1 < top + 15) {
        direction_x *= -1;
        top_speed = randomInteger(1, 5);
        left_speed = 6 - top_speed;
        if (is_solo_game) {
            solo_score++;
            document.getElementById(":").innerText = solo_score;
        }
    }

    //Рикошет от верхней и нижней границы поля
    if (top < 0) {direction_y = 1}
    if (top > 380) { direction_y = -1}

    //Условие завершения раунда(игры)
    if (left === 0) {
        if (is_2_players_game) {
            player2_score++;
            document.getElementById("player2_score").innerText = player2_score;
            if (player2_score === 3) {
                alert("Game Over: Player2 win");
                restart_game();
            } else {
                setTimeout(next_round, 1000);
            }
        } else {
            restart_game()
        }

    }
    if (left === 560) {
        if (is_2_players_game) {
            player1_score++;
            document.getElementById("player1_score").innerHTML = player1_score;
            if (player1_score === 3) {
                alert("Game Over: Player1 win");
                restart_game();
            } else {
                setTimeout(next_round, 1000);
            }
        } else {
            restart_game()
        }
    }
}, 10);
//////////////////////////////////////////////////

//Функция для получения случайного числа
function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

//Начало нового раунда
function next_round() {
    document.getElementById("ball").remove();

    create_ball();
    direction_x *= -1;
    top_speed = 0;
    left_speed = 5

    top1 = 150;
    top2 = 150;
    player1.style.top = top1 + "px";
    player2.style.top = top2 + "px";
}

//Создание мяча
function create_ball() {
    let arena = document.getElementById("arena");
    let ball = document.createElement("input");
    ball.type = "button";
    ball.id = "ball";
    ball.className = "ball";
    arena.append(ball);
}

//Завершение игры
function restart_game() {
    game_is_started = false;
    is_solo_game = false;
    is_2_players_game = false;

    document.getElementById("ball").remove();

    direction_x = 1;
    top_speed = 0;
    left_speed = 5;

    top1 = 150;
    top2 = 150;
    player1.style.top = top1 + "px";
    player2.style.top = top2 + "px";

    player1_score = 0;
    player2_score = 0;
    solo_score = 0;

    document.getElementById("player1_score").innerText = "";
    document.getElementById("player2_score").innerText = "";
    document.getElementById(":").innerText = "PinPong";

    document.getElementById(":").style.marginLeft = 0 + "px";
    document.getElementById("player1_score").style.marginLeft = 0 + "px";
}