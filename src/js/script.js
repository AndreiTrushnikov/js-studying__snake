/* Игра ЗМЕЙКА */
/* Определение змейки и её положение на экране*/
let startX = 0; // относительно родителя (от 0 до 200)
let startY = 0; // относительно родителя (от 0 до 200)
// let snakeWidth = 10;
// let snakeHeight = 10;
let speed = 250; // Скорость движения в мс
let snake = document.querySelector('#tail-0'); // начальный пиксель змейки
let tailObj = {};

/* Кнопки */
let startBtn = document.querySelector('#start'); // Кнопка старт
let stopBtn = document.querySelector('#stop');   // Кнопка принудительной остановки

/* Поле */
let field = document.querySelector('#field'); // Находим поле в DOM
let widthOfField = 100; // Ширина игрового поля
let heightOfField = 100; // Высота игрового поля

/* Вспомогательные элементы */
let direction; // 1 - up, 2 - right, 3 - down, 4 - left;
let snakeRight, snakeLeft, snakeUp ,snakeDown;
let snakeTailUp, snakeTailDown, snakeTailLeft, snakeTailRight;
let snakeTailUpDelay, snakeTailDownDelay, snakeTailLeftDelay, snakeTailRightDelay;
let snakeCoordinates;

/* Вывод отчётов*/
let reports = document.querySelector('#reports');

// Определение текущих координат X и Y snake
function snakePartCoordX(tailCount) {
    let snakePart = document.querySelector(`#tail-${tailCount}`); 
    return snakePart.style.left;
}
function snakePartCoordY(tailCount) {
    let snakePart = document.querySelector(`#tail-${tailCount}`); 
    return snakePart.style.top;
}
function createAllCoord(tailCount) {
    if (tailCount == 0) {
        tailObj[tailCount] = {
            'x' : snakePartCoordX(tailCount),
            'y' : snakePartCoordY(tailCount)
        };       
    }
    if (tailCount > 1) {
        // tailObj[tailCount-1] = {
        //     'x' : snakePartCoordX(tailCount-1),
        //     'y' : snakePartCoordY(tailCount-1)
        // }; 
        let tailPart = document.querySelector(`#tail-${tailCount}`);
        tailPart.style.left = snakePartCoordX(tailCount-1);
        tailPart.style.top = snakePartCoordY(tailCount-1);
    }
    return tailObj;
}
/* Генерация нового блока */
function newRandomBlock(widthOfField, heightOfField) {
    let x, y;
    let arrX = [];
    let arrY = [];

    // Создаём массивы возможных значений X и Y, кратные 10
    for (var i = 0; i<widthOfField/10; i++) {
        arrX[i] = i*10;
    }
    for (var j = 0; j<heightOfField/10; j++) {
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

    // console.log('new block x =',x);
    // console.log('new block y =',y);

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
function snakeTailMovement(tailCount) {
    // clearInterval(snakeTailUp);
    // clearInterval(snakeTailDown);
    // clearInterval(snakeTailLeft);
    // clearInterval(snakeTailRight);

    // console.log('.'+tailCount);
    
    let tail = document.querySelector(`#tail-${tailCount}`);
    console.log('Tail =',tail);

    // let newX = tailObj[tailCount-1].x;
    // let newY = tailObj[tailCount-1].y;
    
    // snakeTailUpDelay = setTimeout(()=> {
        
        snakeTailUp = setInterval(() => {
            createAllCoord(tailCount);
            // tail.style.top = snakePartCoordY(tailCount-1);
            // tail.style.left = snakePartCoordX(tailCount-1);
            // console.log(`Snake Head X = `,snake.style.left);
            // console.log(`Snake Head Y = `,snake.style.top);
            // console.log(`Tail-${tailCount} X = `,tail.style.left);
            // console.log(`Tail-${tailCount} Y = `,tail.style.top);
            // console.log('__________________________');
        },speed);
    // },speed);
}

// Если съел
let tailCount = 0;
function wasEaten(direction, oldBlock) {
    tailCount++;
    
    oldBlock.classList.remove('food');
    oldBlock.id = `tail-${tailCount}`;
    oldBlock.classList.add('tail--body');

    snakeCoordinates = setInterval(()=>{
        // debugger
        tailObj = createAllCoord(tailCount);
    },speed);

    snakeTailMovement(tailCount);

    let newBlock = newRandomBlock(widthOfField, heightOfField);
    return newBlock;
}
// проверка попадания snake на food
function isEaten(currentX, currentY) {
    let food = document.querySelector('.food');
    if ((food.style.left == currentX) && (food.style.top == currentY)) {
        wasEaten(direction,food,currentX,currentY);
    }
}
// проверка на столкновения со стенками поля
function checkBorders() {
    // if ((snake.style.top < 0 + 'px') || (snake.style.top == heightOfField + 'px') || (snake.style.left < 0 + 'px') || (snake.style.left == widthOfField + 'px')) {
    //     reports.innerHTML = 'Ты проиграл!';

    //     stopGame();
    // }
    if ( < 0) {
        snake.style.top = heightOfField-10+'px'; 
    }
    if (snake.style.top > heightOfField) {
        snake.style.top = 0 +'px'; 
    }
    if (snake.style.left < 0) {
        snake.style.left = widthOfField-10 + 'px';
    }
    if (snake.style.left > widthOfField + 'px') {
        snake.style.left = 0 + 'px';
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
        isEaten(snakePartCoordX(0),snakePartCoordY(0));
    }),0);
    snakeUp = setInterval(() => {
        let tempTop = snake.style.top;
        snake.style.top = parseInt(tempTop) - 10 + 'px';
        isEaten(snakePartCoordX(0),snakePartCoordY(0));
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
        isEaten(snakePartCoordX(0),snakePartCoordY(0));
    }),0);
    snakeDown = setInterval(() => {
        let tempTop = snake.style.top;
        snake.style.top = parseInt(tempTop) + 10 + 'px';
        isEaten(snakePartCoordX(0),snakePartCoordY(0));
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
        isEaten(snakePartCoordX(0),snakePartCoordY(0));
    }),0);
    snakeLeft = setInterval(() => {
        let tempLeft = snake.style.left;
        snake.style.left = parseInt(tempLeft) - 10 + 'px';
        isEaten(snakePartCoordX(0),snakePartCoordY(0));
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
        isEaten(snakePartCoordX(0),snakePartCoordY(0));
    }),0);
    snakeRight = setInterval(() => {
        let tempLeft = snake.style.left;
        snake.style.left = parseInt(tempLeft) + 10 + 'px';
        isEaten(snakePartCoordX(0),snakePartCoordY(0));
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
            // let tail = document.querySelector(`tail-${tailCount-1}`);
            // if (tail) {
            //     snakeTailUpFn();
            //     // tail.classList.remove('tail');
            // }            
        }
    }
    if (e.keyCode == 40) {
        if (direction == 'down') {
            return false;
        }
        if ((direction == 'left') || (direction == 'right')) {
            // console.log('down');
            snakeDownFn();
            // let tail = document.querySelector(`tail-${tailCount-1}`);
            // if (tail) {
            //     snakeTailDownFn();
            //     // tail.classList.remove('tail');
            // }
        }
    }
    if (e.keyCode == 37) {
        if (direction == 'left') {
            return false;
        }
        if ((direction == 'up') || (direction == 'down')) {
            // console.log('left');
            snakeLeftFn();
            // let tail = document.querySelector(`tail-${tailCount-1}`);
            // if (tail) {
            //     snakeTailLeftFn();
            //     // tail.classList.remove('tail');
            // }
        }
    }
    if (e.keyCode == 39) {
        if (direction == 'right') {
            return false;
        }
        if ((direction == 'up') || (direction == 'down')) {
            // console.log('right');
            snakeRightFn();
            // let tail = document.querySelector(`tail-${tailCount-1}`);
            // if (tail) {
            //     snakeTailRightFn();
            //     // tail.classList.remove('tail');
            // }
        }
    }
};
// Стоп игры (проигрыш или нажатие СТОП)
function stopGame() {
    clearInterval(snakeDown);
    clearInterval(snakeLeft);
    clearInterval(snakeUp);
    clearInterval(snakeRight);
    clearInterval(snakeTailUp);
    clearInterval(snakeCoordinates);
    window.removeEventListener('keydown', arrowPresses, false);
    let food = document.querySelector('.food');
    food.remove();
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled','disabled');
}
// Запуск игры
function startGame(startX,startY,speed) {
    reports.innerHTML = 'Начало игры!';
    setPosition(startX,startY);
    snakeRightFn(speed);
    window.addEventListener('keydown', arrowPresses, false);

    // tailObj[`0`] = {
    //     'x' : snakePartCoordX(0),
    //     'y' : snakePartCoordY(0)
    // };

    let newBlock = newRandomBlock(widthOfField, heightOfField);
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