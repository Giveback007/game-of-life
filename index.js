function generateGrid() {
	var randomArr = [];
	var filler = [];
	for (var i = 0; i < 500; i++) {
		randomArr[i] = [];
		filler[i] = [];
		for (var j = 0; j < 500; j++) {
			var random = Math.random() < 0.2;
			var num = random ? 1 : 0;
			randomArr[i][j] = num;
			filler[i][j] = 0;
		}
	}

	return [randomArr, filler]
}

console.time('test');
function futureState(currentState) {
	var cst = currentState[0].slice(0);
	var score = currentState[1].slice(0);
	var fst = [];
	var ht = cst.length - 1;
	var lh = cst[0].length - 1;

	function passScore(row, col) {
		var rowTop = row-1, rowBot = row+1, colL = col-1, colR = col+1;
		if (row == 0) {rowTop = ht}
		else if (row == ht) {rowBot = 0}
			score[rowTop][colL] += 1;
			score[rowTop][col] += 1;
			score[rowTop][colR] += 1;
			score[row][colL] += 1;
			score[row][colR] += 1;
			score[rowBot][colL] += 1;
			score[rowBot][col] += 1;
			score[rowBot][colR] += 1;
	}

	function leftColPass(row, col) {
		var rowTop = row-1, rowBot = row+1, colL = lh, colR = col+1;
			score[rowTop][colL] += 1;
			score[rowTop][col] += 1;
			score[rowTop][colR] += 1;
			score[row][colL] += 1;
			score[row][colR] += 1;
			score[rowBot][colL] += 1;
			score[rowBot][col] += 1;
			score[rowBot][colR] += 1;
	}

	function rightColPass(row, col) {
		var rowTop = row-1, rowBot = row+1, colL = col-1, colR = 0;
			score[rowTop][colL] += 1;
			score[rowTop][col] += 1;
			score[rowTop][colR] += 1;
			score[row][colL] += 1;
			score[row][colR] += 1;
			score[rowBot][colL] += 1;
			score[rowBot][col] += 1;
			score[rowBot][colR] += 1;
	}

	score[0][0] = score[0][lh] = score[ht][0] = score[ht][lh] = 1;
	if (cst[0][0])
	{score[ht][0] += 1; score[ht][1] += 1; score[0][lh] += 1; score[0][1] += 1; score[1][lh] += 1; score[1][0] += 1; score[1][1] += 1}
	if (cst[0][lh])
	{score[ht][lh-1] += 1; score[ht][lh] += 1; score[0][lh-1] += 1; score[0][0] += 1; score[1][lh-1] += 1; score[1][lh] += 1; score[1][0] += 1}
	if (cst[ht][0])
	{score[ht-1][lh] += 1; score[ht-1][0] += 1; score[ht-1][1] += 1; score[ht][lh] += 1; score[ht][1] += 1; score[0][0] += 1; score[0][1] += 1}
	if (cst[ht][lh])
	{score[ht-1][lh-1] += 1; score[ht-1][lh] += 1; score[ht-1][0] += 1; score[ht][lh-1] += 1; score[ht][0] += 1; score[0][lh-1] += 1; score[0][lh] += 1}

	function isAlive(num) {
		if (num == 5 || num == 6) {return 1} else {return 0}
	}

	for (var i = 0; i <= ht; i++) {
		for (var j = 1; j < lh; j++) {
			if (cst[i][j]) {passScore(i, j);}
		}
	}

	for (var i = 1; i < lh; i++) {
		if (cst[i][0]) {leftColPass(i, 0)}
	}

	for (var i = 1; i < lh; i++) {
		if (cst[i][lh]) {rightColPass(i, lh)}
	}

	return score;
}

var x = futureState(generateGrid());

console.timeEnd('test')
