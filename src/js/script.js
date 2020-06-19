/* Игра ЗМЕЙКА */
/* Определение змейки и её положение на экране*/
let startX = 100; // относительно родителя (от 0 до 200)
let startY = 100; // относительно родителя (от 0 до 200)
// let snakeWidth = 10;
// let snakeHeight = 10;
let speed = 100; // Скорость движения в мс
let snake = document.querySelector('#snake'); // начальный пиксель змейки

/* Кнопки */
let startBtn = document.querySelector('#start'); // Кнопка старт
let stopBtn = document.querySelector('#stop');   // Кнопка принудительной остановки

/* Поле */
let field = document.querySelector('#field'); // Находим поле в DOM
let widthOfField = 300; // Ширина игрового поля
let heightIfField = 300; // Высота игрового поля

/* Вспомогательные элементы */
let direction; // 1 - up, 2 - right, 3 - down, 4 - left;
let snakeRight, snakeLeft, snakeUp ,snakeDown;
let snakeTailUp, snakeTailDown, snakeTailLeft, snakeTailRight;
let snakeTailUpDelay, snakeTailDownDelay, snakeTailLeftDelay, snakeTailRightDelay;

/* Вывод отчётов*/
let reports = document.querySelector('#reports');

// Определение текущих координат X и Y snake
function snakeCoordX() {
    return snake.style.left;
}
function snakeCoordY() {
    return snake.style.top;
}
/* Генерация нового блока */
function newRandomBlock(widthOfField, heightIfField) {
    let x, y;
    let arrX = [];
    let arrY = [];

    // Создаём массивы возможных значений X и Y, кратные 10
    for (var i = 0; i<widthOfField/10; i++) {
        arrX[i] = i*10;
    }
    for (var j = 0; j<heightIfField/10; j++) {
        arrY[j] = j*10;
    }

    // Создание рандомных координат нового блока
    function randX(arrX) {
        return arrX[Math.round((Math.random() * (arrX.length)))];
    }
    function randY(arrY) {
        return arrY[Math.round(Math.random() * (arrY.length))];
    }

    x = randX(arrX);
    y = randY(arrX);

    console.log('new block x =',x);
    console.log('new block y =',y);

    function createNewBlock(x,y) {
        var newBlock = document.createElement('div');
            newBlock.className = 'food';
            newBlock.style.left = x +'px';
            newBlock.style.top = y +'px';

        field.appendChild(newBlock);
    }

    createNewBlock(x,y);
    return [x, y];
}
// Перемещения хвоста
function snakeTailUpFn(oldBlock) {
    // clearInterval(snakeTailUp);
    clearInterval(snakeTailDown);
    clearInterval(snakeTailLeft);
    clearInterval(snakeTailRight);
    console.log('oldBlock=',oldBlock);
    
    snakeTailUpDelay = setTimeout(()=> {
        snakeTailUp = setInterval(() => {
            let tempTop = oldBlock.style.top;
            oldBlock.style.top = parseInt(tempTop) - 10 + 'px';
        },speed);
    },speed);
    console.log('Tail goes up');
}
function snakeTailDownFn(oldBlock) {
    clearInterval(snakeTailUp);
    // clearInterval(snakeTailDown);
    clearInterval(snakeTailLeft);
    clearInterval(snakeTailRight);
    console.log('oldBlock=',oldBlock);
    
    snakeTailDownDelay = setTimeout(()=> {
        snakeTailDown = setInterval(() => {
            let tempTop = oldBlock.style.top;
            oldBlock.style.top = parseInt(tempTop) + 10 + 'px';
        },speed);
    },speed);
    console.log('Tail goes down');
}
function snakeTailLeftFn(oldBlock) {
    clearInterval(snakeTailUp);
    clearInterval(snakeTailDown);
    // clearInterval(snakeTailLeft);
    clearInterval(snakeTailRight);
    console.log('oldBlock=',oldBlock);
    
    snakeTailLeftDelay = setTimeout(()=> {
        snakeTailLeft = setInterval(() => {
            let tempTop = oldBlock.style.left;
            oldBlock.style.left = parseInt(tempTop) - 10 + 'px';
        },speed);
    },speed);
    console.log('Tail goes left');
}
function snakeTailRightFn(oldBlock) {
    clearInterval(snakeTailUp);
    clearInterval(snakeTailDown);
    clearInterval(snakeTailLeft);
    // clearInterval(snakeTailRight);
    console.log('oldBlock=',oldBlock);
    
    snakeTailRightDelay = setTimeout(()=> {
        snakeTailRight = setInterval(() => {
            let tempTop = oldBlock.style.left;
            oldBlock.style.left = parseInt(tempTop) + 10 + 'px';
        },speed);
    },speed);
    console.log('Tail goes right');
}
// Если съел
function wasEaten(direction, oldBlock) {
    
    oldBlock.classList.remove('food');
    oldBlock.classList.add('tail');
    switch (direction) {
        case 'up' :
            snakeTailUpFn(oldBlock);
            break;
        case 'down':
            snakeTailDownFn(oldBlock);
            break;
        case 'left':
            snakeTailLeftFn(oldBlock);
            break;
        case 'right':
            snakeTailRightFn(oldBlock);
            break;
    }
    let newBlock = newRandomBlock(widthOfField, heightIfField);
    return newBlock;
}
// проверка попадания snake на food
function isEaten(currentX, currentY) {
    let food = document.querySelector('.food');
    if ((food.style.left == currentX) && (food.style.top == currentY)) {
        wasEaten(direction,food);
    }
}
// проверка на столкновения со стенками поля
function checkBorders() {
    if ((snake.style.top < 0 + 'px') || (snake.style.top == heightIfField + 'px') || (snake.style.left < 0 + 'px') || (snake.style.left == widthOfField + 'px')) {
        reports.innerHTML = 'Ты проиграл!';
        startBtn.removeAttribute('disabled');
        stopBtn.setAttribute('disabled','disabled');
        stopGame();
    }
}
// установка начальной точки змейки
function setPosition(startX,startY) {
    snake.style.top = startY+'px';
    snake.style.left = startX+'px';
}


// движение вверх Головы змеи
function snakeUpFn() {
    direction = 'up';
    clearInterval(snakeDown);
    clearInterval(snakeLeft);
    clearInterval(snakeRight);
    setTimeout((() => {
        let tempTop = snake.style.top;
        snake.style.top = parseInt(tempTop) - 10 + 'px';
        isEaten(snakeCoordX(),snakeCoordY());
    }),0);
    snakeUp = setInterval(() => {
        let tempTop = snake.style.top;
        snake.style.top = parseInt(tempTop) - 10 + 'px';
        isEaten(snakeCoordX(),snakeCoordY());
        checkBorders();
    },speed);
}
// движение вниз Головы змеи
function snakeDownFn() {
    direction = 'down';
    clearInterval(snakeLeft);
    clearInterval(snakeRight);
    clearInterval(snakeUp);
    setTimeout((() => {
        let tempTop = snake.style.top;
        snake.style.top = parseInt(tempTop) + 10 + 'px';
        isEaten(snakeCoordX(),snakeCoordY());
    }),0);
    snakeDown = setInterval(() => {
        let tempTop = snake.style.top;
        snake.style.top = parseInt(tempTop) + 10 + 'px';
        isEaten(snakeCoordX(),snakeCoordY());
        checkBorders();
    },speed);
}
// движение влево Головы змеи
function snakeLeftFn() {
    direction = 'left';
    clearInterval(snakeDown);
    clearInterval(snakeRight);
    clearInterval(snakeUp);
    setTimeout((() => {
        let tempLeft = snake.style.left;
        snake.style.left = parseInt(tempLeft) - 10 + 'px';
        isEaten(snakeCoordX(),snakeCoordY());
    }),0);
    snakeLeft = setInterval(() => {
        let tempLeft = snake.style.left;
        snake.style.left = parseInt(tempLeft) - 10 + 'px';
        isEaten(snakeCoordX(),snakeCoordY());
        checkBorders();
    },speed);
}
// движение вправо Головы змеи
function snakeRightFn() {
    direction = 'right';
    clearInterval(snakeDown);
    clearInterval(snakeLeft);
    clearInterval(snakeUp);
    setTimeout((() => {
        let tempLeft = snake.style.left;
        snake.style.left = parseInt(tempLeft) + 10 + 'px';
        isEaten(snakeCoordX(),snakeCoordY());
    }),0);
    snakeRight = setInterval(() => {
        let tempLeft = snake.style.left;
        snake.style.left = parseInt(tempLeft) + 10 + 'px';
        isEaten(snakeCoordX(),snakeCoordY());
        checkBorders();
    },speed);
}



// Отслеживание нажатий клавиш на стрелки
let arrowPresses = function (e) {
    if (e.keyCode == 38) {
        if (direction == 'up') {
            return false;
        }
        if ((direction == 'left') || (direction == 'right')) {
            // console.log('up');
            snakeUpFn();
        }
    }
    if (e.keyCode == 40) {
        if (direction == 'down') {
            return false;
        }
        if ((direction == 'left') || (direction == 'right')) {
            // console.log('down');
            snakeDownFn();
        }
    }
    if (e.keyCode == 37) {
        if (direction == 'left') {
            return false;
        }
        if ((direction == 'up') || (direction == 'down')) {
            // console.log('left');
            snakeLeftFn();
        }
    }
    if (e.keyCode == 39) {
        if (direction == 'right') {
            return false;
        }
        if ((direction == 'up') || (direction == 'down')) {
            // console.log('right');
            snakeRightFn();
        }
    }
};
// Стоп игры (проигрыш или нажатие СТОП)
function stopGame() {
    clearInterval(snakeDown);
    clearInterval(snakeLeft);
    clearInterval(snakeUp);
    clearInterval(snakeRight);
    window.removeEventListener('keydown', arrowPresses, false);
    let food = document.querySelector('.food');
    food.remove();
}

// Запуск игры
function startGame(startX,startY,speed) {
    reports.innerHTML = 'Начало игры!';
    setPosition(startX,startY);
    snakeRightFn(speed);
    window.addEventListener('keydown', arrowPresses, false);
    let newBlock = newRandomBlock(widthOfField, heightIfField);
    return newBlock;
}

startBtn.addEventListener('click', function (e) {
    e.preventDefault();

    startBtn.setAttribute('disabled','disabled');
    stopBtn.removeAttribute('disabled');
    startGame(startX,startY,speed);
});

stopBtn.addEventListener('click', function (e) {
    e.preventDefault();

    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled','disabled');
    stopGame();
});