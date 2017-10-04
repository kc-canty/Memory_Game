var resetButton = document.getElementById("reset-button");
var GameSquares = [];
var firstSquare = null;

var colors = [];
for (var i = 0; i < 10; i++) {
    colors.push('square-' + i);
}

function GameSquare(el, color) {
    this.el = el;
    this.isOpen = false;
    this.isLocked = false;
    this.el.addEventListener("click", this, false);
}

GameSquare.prototype.handleEvent = function(e) {
    switch (e.type) {
        case "click":
          if (this.isOpen || this.isLocked) {
            return;
          }
          this.isOpen = true;
          this.el.classList.add('flip');
          checkGame(this);
    }
}

GameSquare.prototype.reset = function() {
    this.isOpen = false;
    this.isLocked = false;
    this.el.classList.remove('flip');
}

GameSquare.prototype.lock = function() {
    this.isLocked = true;
    this.isOpen = true;
}

GameSquare.prototype.setColor = function(color) {
    this.el.children[0].children[1].classList.remove(this.color);
    this.color = color;
    this.el.children[0].children[1].classList.add(color);
}

function GameSquare(el, color) {
    this.el = el;
    this.isOpen = false;
    this.isLocked = false;
    this.el.addEventListener("click", this, false);
    this.setColor(color);
}

function setupGame() {
    var array = document.getElementsByClassName("game-square");
    for(var i = 0; i < array.length; i++) {
        var index = random(randomColors.length);
        var color = randomColors.splice(index, 1)[0];
        GameSquares.push(new GameSquare(array[i], colors[0]));
    }
}

setupGame();

function random(n) {
    return Math.floor(Math.random() * n);
}

function getSomeColors() {
    var colorscopy = colors.slice();
    var randomColors = [];
    for (var i = 0; i < 8; i++) {
        var index = random(colorscopy.lenth);
        randomColors.push(colorscopy.splice(index, 1)[0]);
    }
    return randomColors.concat(randomColors.slice());
}

function checkGame(GameSquare) {
    if (firstSquare === null) {
        firstSquare = GameSquare;
        return
    }
    if (firstSquare.color === GameSquare.color) {
        firstSquare.lock();
        GameSquare.lock();
    } else {
        var a = firstSquare;
        var b = GameSquare;
        setTimeout (function() {
            a.reset();
            b.reset();
            firstSquare = null;
        }, 400);
    }
    firstSquare = null;
}

function randomizeColors() {
  var randomColors = getSomeColors();
  gameSquares.forEach(function(gameSquare) {
    var color = randomColors.splice(random(randomColors.length), 1)[0];
    gameSquare.setColor(color);
  });
}

function clearGame() {
  gameSquares.forEach(function(gameSquare) {
    gameSquare.reset();
  });
  setTimeout(function() {
    randomizeColors();
  }, 500);
}
