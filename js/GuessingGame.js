// JavaScript Code:

function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.playersGuessSubmission = function(num) {
	if (num < 1)
		throw 'That is an invalid guess.';
	else if (num > 100)
		throw 'That is an invalid guess.';
	else if (typeof num !== 'number')
		throw 'That is an invalid guess.';
	else
		this.playersGuess = num;
	return this.checkGuess();
}

Game.prototype.checkGuess = function() {
	if (this.playersGuess === this.winningNumber)
		return 'You Win!';
	else if (this.pastGuesses.indexOf(this.playersGuess) !== -1)
		return 'You have already guessed that number.';
	else if (this.playersGuess !== this.winningNumber)
		this.pastGuesses.push(this.playersGuess);
	
	if (this.pastGuesses.length === 5)
		return 'You Lose.';
	else if (this.difference() < 10)
		return 'You\'re burning up!';
	else if (this.difference() < 25)
		return 'You\'re lukewarm.';
	else if (this.difference() < 50)
		return 'You\'re a bit chilly.';
	else if (this.difference() < 100)
		return 'You\'re ice cold!';
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber ? true : false;
}

Game.prototype.provideHint = function() {
	var hintArr = [];
	hintArr.push(this.winningNumber);
	hintArr.push(generateWinningNumber());
	hintArr.push(generateWinningNumber());
	return shuffle(hintArr);
}

function generateWinningNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

function newGame() {
	return new Game;
}

function shuffle(arr) {
	var m = arr.length;
	var t;
	var i;
	// Fisher-Yates Shuffle Algorithm: while there remain elements to shuffle
	while(m) {
		// Pick a remaining element
		i = Math.floor(Math.random() * m--);
		// Swap it with the current element
		t = arr[m];
		arr[m] = arr[i];
		arr[i] = t;
	}
	return arr;
}

// jQuery Code:

function guess(game) {
	var input = +$('#player-input').val();
	$('#player-input').val('');
	var output = game.playersGuessSubmission(input);
	console.log(output);
}

$(document).ready(function() {
	var currentGame = new Game;
	
	$('#submit').on('click', function(){
		guess(currentGame);
	});
	
	$('#player-input').keypress(function(event) {
		if (event.which === 13) {
			guess(currentGame);
		}
	});
});