// JavaScript:

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

// jQuery:

$(document).ready(function() {
	var currentGame = new Game;
	
	$('#submit').on('click', function(){
		guess(currentGame);
	});
	
	$('#player-input').keypress(function(event) {
		if (event.which === 13)
			guess(currentGame);
	});

	$('#reset').on('click', function(){
		currentGame = newGame();
		$('h1').text('Play the Guessing Game');
    $('h3').text('Guess a number between 1-100.');
    $('#player-input').val('');
    $('.guess').text('-');
		$('#submit, #hint, #player-input').prop('disabled', false);
	});

	$('#hint').on('click', function(){
		$('h1').text(currentGame.provideHint());
		$('h3').text('One of those might be the droids you\'re looking for.');
	});
});

function guess(currentGame) {
	var input = +$('#player-input').val();
	$('#player-input').val('');
	var output = currentGame.playersGuessSubmission(input);
	
	if (output === 'You have already guessed that number.') {
		$('h1').text(output);
	} else if (output === 'You Win!' || output === 'You Lose.') {
		$('#guess-list li:nth-child('+currentGame.pastGuesses.length+')').text(input);
		$('h1').text(output);
		$('h3').text('Click Reset to play again.');
		$('#submit, #hint, #player-input').prop('disabled', true);
	} else {
		$('#guess-list li:nth-child('+currentGame.pastGuesses.length+')').text(input);
		$('h1').text(output);
		if (currentGame.isLower())
			$('h3').text('Try higher');
		else
			$('h3').text('Try lower');
	}
}