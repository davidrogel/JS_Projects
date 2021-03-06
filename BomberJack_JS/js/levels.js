
var map01 = [
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8],
    [2, 0, 3, 3, 3, 0, 0, 0, 0, 0, 3, 3, 3, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0,-1,-1,-1,-1, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 10],
    [2, 0, 0,-1,-1, 0, 0, 3, 3, 3, 3, 0, 0, 10],
    [2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 10],
    [2, 3, 0, 0, 0, 0,-1, 5,-1, 0, 0, 0, 0, 10],
    [2, 3, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 3, 10],
    [2, 3,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 10],
    [2,-1, 3, 3, 3,-1,-1,-1,-1,-1,-1,-1,-1, 10],
    [6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9]
	];

var map02 = [
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8],
    [2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 10],
    [2, 0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0, 10],
    [2, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 3,-1, 0, 0,-1, 3, 0, 0, 0, 10],
    [2, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 3, 0, 0, 0, 0, 3, 0, 0, 0, 10],
    [2, 0, 0, 0, 3,-1,-1, 5,-1, 3, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 3, 10],
    [2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2,-1,-1, 3, 3,-1,-1,-1,-1, 3, 3,-1,-1, 10],
    [6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9]
	];

var map03 = [
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8],
    [2, 0, 0, 0, 0, 0,-1,-1, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 7, 1, 0, 0, 0, 0, 0, 10],
    [2, 0, 3, 3, 0, 0, 2,-1,-1, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 6, 4, 4, 0, 0, 0, 0, 10],
    [2, 0, 3, 3, 0, 0,-1,-1, 0, 0, 3, 0, 3, 10],
    [2, 0, 0, 0, 1, 1, 1, 8, 0, 0, 0, 0, 0, 10],
    [2, 0, 3, 3, 0, 0, 0,10, 0, 0, 0, 3, 0, 10],
    [2, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0,-1, 0, 0, 3, 0, 3, 10],
    [2, 0, 0, 0, 0, 0, 7, 1, 1, 1, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 2,-1, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 6, 4, 0, 0, 0, 0, 0, 10],
    [2, 0, 3, 3, 3, 0,-1,-1, 0, 3, 0, 0, 3, 10],
    [2, 0, 1, 1, 1, 1, 1, 1, 1, 0, 3, 3, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 10],
    [2,-1,-1,-1,-1,-1,-1, 5,-1,-1,-1,-1,-1, 10],
    [6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9]
	];

var map00 = [
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
    [6, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9]
	];
