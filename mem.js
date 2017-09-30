var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;

function newBoard() {
	tiles_flipped = 0;
	memory_array = _.shuffle(memory_array);
	var output = '';
	_.forEach(memory_array, function(memory_array_value, index) {
 	output += '<div id = "tile_' + index +'" onclick = "memoryFlipTile(this,\'' + memory_array_value + '\')"></div>';
	});

	document.getElementById('memory_board').innerHTML = output;
}

function memoryFlipTile(tile, value) {
	if (canFlipCard(tile)) {
		flipcard(tile, value);
		if (areNoCardsFlipped()) {
			setCardAsFlipped(tile,value);
				if(isThereIsAMatch()) {
					matchCards();
					if (isGameOver()) {
						gameIsOver();
					}
				} else {
					cardsDoNotMatch();
				}
			}
		}
	}

function canFLipCard(tile) {
	return tile.innerHTML == "" && memory_values.length < 2;
}

function  flipCard(tile, value) {
	tile.style.background = '#FFFFFF';
	tile.innerHTML = value;
}

function areNoCardsFlipped() {
	return memory_values.length == 0;
}

function isOneCardFlippped() {
	return memory_values.length == 1;
}

function setCardAsFlipped(tile, value) {
	if (memory_values.length == 0) {
		memory_values.push(val);
		memory_tile_ids.push(tile.id);
	}

function isThereAMatch() {
	return memory_values[0] == memory_values[1];
}

function matchCards() {
	tiles_flipped += 2;
	memory_values = [ ];
	memory_tile_ids = [ ];
}

function isGameOver() {
	return tiles_flipped == memory_array.length;
}

function gameIsOver() {
	alert("Board is cleared.  New game board being generated...");
	document.getElementById('memory_board').innerHTML = " ";
	newBoard();
}

function cardsDoNotMatch() {
	setTimeoute(flipCarBack, 900);
}

function flipCardBack() {
	var tile_1 = document.getElementById(memory_tile_ids[0]);
	var tile_2 = document.getElementById(memory_tile_ids[1]);
	tile_1.style.background = '#FF3399';
	tile_1.innerHTML = " ";
	tile_2.style.background = '#FF3399';
	tile_2.innerHTML = " ";
	memory_values = [ ];
	memory_tile_ids = [ ];
}