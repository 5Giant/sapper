//Задали клетку через конструктор
function GetCell(x, y) {
  this.Research = false;
  this.x = x;
  this.y = y;
  this.mine = false;
  this.neighbours = 0;
  this.name = 0;
  this.flag = false;
  this.explosion = false;
}

let x = 0,
  y = 0,
  newCell = 0,
  mines = 0,
  side = 0,
  time = 0,
  timerId = 0,
  message = 0,
  check = false,
  sounds = 0;
cellArray = [];
//Случаной число в диапазоне мин/макс
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//Определяем соседей клетки
function getNeighbours(cell) {
  if (cell.x == x + 1 && cell.y == y) {
    return true;
  }
  if (cell.x == x + 1 && cell.y == y - 1) {
    return true;
  }
  if (cell.x == x && cell.y == y - 1) {
    return true;
  }
  if (cell.x == x - 1 && cell.y == y - 1) {
    return true;
  }
  if (cell.x == x - 1 && cell.y == y) {
    return true;
  }
  if (cell.x == x - 1 && cell.y == y + 1) {
    return true;
  }
  if (cell.x == x && cell.y == y + 1) {
    return true;
  }
  if (cell.x == x + 1 && cell.y == y + 1) {
    return true;
  }
  return false;
}
//Заполнили массив клетками, добавили туда мины и посчитали для каждой клетки соседние мины
function getCellarray() {
  cellArray = [];
  (x = 0), (y = 0), (newCell = 0);
  for (let i = 0; i < side * side; i++) {
    newCell = new GetCell(x, y);
    newCell.name = i;
    cellArray.push(newCell);
    x += 1;
    if (x == side) {
      x = 0;
      y += 1;
    }
  }
  // const mines = Math.floor(side * side * 0.2);
  console.log("Всего мин:" + mines);
  let minesControl = 0;
  for (i = 0; i < mines; i++) {
    let randomNum = getRandomNumber(0, side * side - 1);
    // console.log(randomNum);
    if (cellArray[randomNum].mine == false) {
      cellArray[randomNum].mine = true;
      minesControl++;
    } else {
      i--;
    }
  }
  console.log("Мин на поле:" + minesControl);

  for (cell of cellArray) {
    x = cell.x;
    y = cell.y;
    // console.log(cellArray.filter(getNeighbours));
    cell.neighbours = cellArray
      .filter(getNeighbours)
      .map((cell) => (cell.mine == true ? 1 : 0))
      .reduce((acc, cell) => acc + cell, 0);
  }
  console.log(cellArray);
  return cellArray;
}

const inputSide = document.getElementById("side");
const inputMines = document.getElementById("mines");
const startBtn = document.getElementById("start");
const specialBtn = document.getElementById("special");
const table = document.getElementById("table");
const professional = document.getElementById("professional");
const beginner = document.getElementById("beginner");
const amateur = document.getElementById("amateur");
const reStartBtn = document.getElementById("restart");
const reStartBtn0 = document.getElementById("restart0");
const numOfMines = document.getElementById("numOfMines");
const timer = document.getElementById("timer");
const checkout = document.getElementById("checkout");

reStartBtn.disabled = true;
inputMines.disabled = true;
inputSide.disabled = true;
startBtn.disabled = true;

function gTime() {
  return (time += 1);
}

function gameStart(s, m) {
  clearInterval(timerId);
  time = 0;
  timer.innerHTML = time;
  onOff(0);
  side = s;
  mines = m;
  timerId = setInterval(() => (timer.innerHTML = gTime()), 1000);
  render(getCellarray());
}
checkout.onclick = function () {
  check = !check;
  render(cellArray);
};

beginner.onclick = function () {
  gameStart(9, 10);
};

amateur.onclick = function () {
  gameStart(16, 40);
};

professional.onclick = function () {
  gameStart(22, 99);
};

specialBtn.onclick = function () {
  clearInterval(timerId);
  timer.innerHTML = "";
  onOff(1);
};

reStartBtn.onclick = function () {
  reStartBtn.disabled = true;
  document.getElementById("message").style.visibility = "hidden";
  gameStart(side, mines);
  // render(getCellarray());
};

reStartBtn0.onclick = function () {
  // render(getCellarray());
  gameStart(side, mines);
};

//Включает выключает инпуты режима особый
function onOff(check) {
  if (check === 1) {
    inputMines.disabled = false;
    inputSide.disabled = false;
    startBtn.disabled = false;
    inputMines.style.opacity = "100";
    inputSide.style.opacity = "100";
    startBtn.style.opacity = "100";
  } else {
    inputMines.disabled = true;
    inputSide.disabled = true;
    startBtn.disabled = true;
    inputMines.style.opacity = "0";
    inputSide.style.opacity = "0";
    startBtn.style.opacity = "0";
  }
}

startBtn.onclick = function () {
  // const cellArray = getCellarray();
  // const cellArray = getCellarray(inputElement.value);
  side = inputSide.value;
  mines = inputMines.value;
  // render(getCellarray());
  gameStart(side, mines);
};

//Рисуем поле
function render(cellArray) {
  let cellSide = Math.floor(600 / side),
    iter = 0;
  table.innerHTML = "";
  for (let i = 0; i < side; i++) {
    let newRow = document.createElement("div");
    // newRow.style.height = `${cellSide}px`;
    for (let j = 0; j < side; j++) {
      // console.log(iter);
      let newBut = document.createElement("btn");
      if (cellArray[iter].mine === false) {
        // newBut.innerHTML = cellArray[iter].neighbours;
        newBut.className = "bt1";
      } else {
        if (check == true) {
          newBut.style.backgroundColor = "red";
        }

        newBut.className = "bt1";
        // newBut.innerHTML = "M";
      }
      giveData(newBut, cellArray, iter);

      newRow.appendChild(newBut);
      iter++;
    }
    table.appendChild(newRow);
  }

  function giveData(element, cellArray, iter) {
    element.dataset.name = `${cellArray[iter].name}`;
    element.dataset.neighbours = `${cellArray[iter].neighbours}`;
    element.dataset.mine = `${cellArray[iter].mine}`;
    element.style.height = `${cellSide}px`;
    element.style.width = `${cellSide}px`;
    element.style.fontSize = `${cellSide - 1}px`;

    if (cellArray[iter].flag == true) {
      element.className = "btFlag";
      element.disabled = true;
    } else {
      if (cellArray[iter].Research == true) {
        element.className = "bt3";
        if (cellArray[iter].neighbours != 0) {
          colorOfNum(element, cellArray[iter].neighbours);
          element.innerHTML = cellArray[iter].neighbours;
        }
      }
      if (cellArray[iter].explosion == true) {
        element.className = "bt2";
      }
    }
  }
  numOfMines.innerHTML =
    mines -
    cellArray
      .map((cell) => (cell.flag == true ? 1 : 0))
      .reduce((acc, cell) => acc + cell, 0);
}

//Выбор цвета числа
function colorOfNum(element, neighbours) {
  switch (neighbours) {
    case 1:
      element.style.color = "blue";
      break;
    case 2:
      element.style.color = "green";
      break;
    case 3:
      element.style.color = "red";
      break;
    case 4:
      element.style.color = "darkblue";
      break;
    case 5:
      element.style.color = "darkred";
      break;
    case 6:
      element.style.color = "black";
      break;
  }
}

//Обрабатывае клики по игровому полю
table.onclick = function (event) {
  if (
    event.target.dataset.name != undefined &&
    cellArray[Number(event.target.dataset.flag)] != true
  ) {
    cellRecerch(cellArray[Number(event.target.dataset.name)]);
  }
  render(cellArray);
};

//Установка флага на мину
document.addEventListener("contextmenu", function (event) {
  event.preventDefault(); // Отменяем вызов стандартного контекстного меню браузера

  cellArray[Number(event.target.dataset.name)].flag =
    !cellArray[Number(event.target.dataset.name)].flag;
  render(cellArray);
});

//Логика открытия клеток
function cellRecerch(cell) {
  //проверка на установленный флаг
  if (cell.flag == true) {
    return;
  }
  //проверка на мину
  if (cell.mine == true) {
    cellArray.forEach((cell) =>
      cell.mine == true ? (cell.explosion = true) : false
    );
    // message = "СМЭРТЪ!";
    // document.getElementById("message").style.backgroundColor = "white";
    // document.getElementById("message").style.сolor = "red";
    victoryCheck(cell);
    setTimeout(explosion, 1500);
    return;
  }
  //если нет соседних мин
  if (cell.neighbours == 0) {
    cellArray[Number(cell.name)].Research = true;
    x = cellArray[cell.name].x;
    y = cellArray[cell.name].y;

    let fiend = cellArray
      .filter(getNeighbours)
      .filter((cell) => (cell.mine == false ? true : false));

    console.log(fiend.map((cell) => cell.name));
    let marked = new Set(fiend.map((cell) => cell.name));
    fiend = fiend.filter((cell) => (cell.neighbours == 0 ? true : false));

    fiend.forEach((cell) => (cell.Research = true));
    // console.log(typeof fiend);
    for (; fiend.length != 0; ) {
      // console.log("0" + fiend);
      x = fiend[0].x;
      y = fiend[0].y;

      cellArray
        .filter(getNeighbours)
        .filter((cell) => (cell.mine == false ? true : false))
        .forEach((cell) => marked.add(cell.name));
      fiend = fiend.concat(
        cellArray
          .filter(getNeighbours)
          .filter((cell) => (cell.neighbours == 0 ? true : false))
          .filter((cell) => (cell.mine == false ? true : false))
          .filter((cell) => (cell.Research == false ? true : false))
      );
      // console.log("1" + fiend);
      fiend.forEach((cell) => (cell.Research = true));
      // console.log("1" + fiend);
      fiend.shift();
      // console.log(fiend);
    }

    console.log(fiend);
    marked.forEach((name) => (cellArray[name].Research = true));
    console.log(marked);
    victoryCheck(cell);
    return fiend;
  }
  //если есть соседние мины
  cellArray[Number(cell.name)].Research = true;
  victoryCheck(cell);
}

//проверка победы/поражения
function victoryCheck(cell) {
  if (cell.mine == true) {
    sounds =
      "http://boobooka.com/wp-content/uploads/2018/08/zvuk-kasperskogo-vizg-svini.mp3";
    console.log("вы взорвались");
    message = "СМЭРТЪ!";
    document.getElementById("message").style.backgroundColor = "black";
    document.getElementById("message").style.сolor = "red";
    return;
  }
  console.log(
    cellArray
      .map((cell) => (cell.Research == true ? 1 : 0))
      .reduce((acc, cell) => acc + cell, 0)
  );
  if (
    cellArray
      .map((cell) => (cell.Research == true ? 1 : 0))
      .reduce((acc, cell) => acc + cell, 0) ==
    cellArray.length - mines
  ) {
    sounds =
      "https://www.myinstants.com/media/sounds/hailrake_-_vi_ka1-mp3cut.mp3";
    console.log("мин больше нет");
    message = "VI KA";
    // message = "ПОБЕДА!";
    document.getElementById("message").style.backgroundColor = "gold";
    document.getElementById("message").style.сolor = "cherry";
    setTimeout(explosion, 1500);
  }
}
//Поражение!!!!
// const dead = document.getElementById("die");
// dead.onclick = function () {
//   explosion();
// };

//вывод сообщения о победе/поражении
function explosion() {
  sound(sounds);
  document.getElementById("mes").innerHTML = message;
  reStartBtn.disabled = false;
  document.getElementById("message").style.visibility = "visible";
  // document.message.style.opacity = "100";
  // console.log("suck");
  // let Message = document.createElement("div"),
  //   reStartBtn = document.createElement("btn");
  // Message.className = "expl";
  // Message.innerHTML = "СМЭРТЪ";
  // Message.id = "die1";
  // body.appendChild(Message);
  // die1.appendChild(reStartBtn);
  // Message.insertAdjacentHTML(
  //   "beforeend",
  //   `<button id="restart">Рестарт!</button>`
  // );
}

// var el = document.getElementById("btn-play");
// var playing = false; // текущее состояние плеера

// var player = new Audio(
//   "https://www.myinstants.com/media/sounds/hailrake_-_vi_ka1-mp3cut.mp3"
// );
// player.preload = "auto";
// player.addEventListener("ended", function () {
//   // слушаем окончание трека
//   el.innerText = "Done";
//   playing = false;
// });
// el.addEventListener("click", playPause); // слушаем нажатие на кнопку

// function playPause() {
//   if (playing) {
//     player.pause();
//     el.innerText = "Paused";
//   } else {
//     player.play();
//     el.innerText = "Playing..";
//   }
//   playing = !playing;
// }

function sound(sounds) {
  var audio = new Audio();
  audio.src = sounds;
  audio.play();
}
