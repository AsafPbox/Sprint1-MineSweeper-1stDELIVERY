'use strict';

var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
};

var MINE = '*'
var FLOOR = '[+]'
var MARK = '^'
var FLIPPED = '[?]'
var isFirstClick = false;
var gMinesArray;


// This is called when page loads
function initGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}


// Builds the board Set mines at random locations Call setMinesNegsCount() Return the created board
function buildBoard() {
    // console.log('buildBoard function');
    var board = [];
    for (var i = 0; i < 4; i++) {
        board.push([]);
        for (var j = 0; j < 4; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                neighborsAround: []
            };
        }
    }
    return board;
}

// Count mines around each cell and set the cell's minesAroundCount.
function setMinesNegsCount(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var negs = countNegs(i, j)
            board[i][j].neighborsAround.push(...negs)
        }
    }
}

// function setMinesNegsCount(elCell) {
//     var coords = getCellCoord(elCell.toElement.id);
//     gBoard[coords.i][coords.j].isShown = true;
//     var negsArray = countNegs(coords.i, coords.j);
//     if (gBoard[coords.i][coords.j].minesAroundCount === 0) {
//         console.log('No Mines Around')
//     }
//     for (var m = 0; m < negsArray.length; m++){
//         // console.log(gBoard[negsArray[m].i][negsArray[m].j]);
//         if (gBoard[negsArray[m].i][negsArray[m].j].isMine === false){
//             if (gBoard[negsArray[m].i][negsArray[m].j].isShown === false){
//                 renderCell({i: negsArray[m].i, j: negsArray[m].j}, FLIPPED)
//             }
//         }
//     }
// }

// Called when a cell (td) is clicked // need to set var for long names
function cellClicked(elCell) {
    switch (elCell.which) {
        case 1: // left click
            if (isFirstClick === false) {
                isFirstClick = true;
                placeRandMines(gLevel.MINES)
                setMinesNegsCount(gBoard)
            }
            var coords = getCellCoord(elCell.toElement.id)
            // if (gBoard[coords.i][coords.j].isMarked = true) break;
            if (gBoard[coords.i][coords.j].isMine === true) {
                minesExplode()
            }
            else {
                // destroyed this part before i left :\
                if (gBoard[coords.i][coords.j].minesAroundCount === 0) {
                    gBoard[coords.i][coords.j].isShown = true;
                    for (var a = 0; a < gBoard[coords.i][coords.j].neighborsAround.length; a++) {
                        gBoard[coords.i][coords.j].neighborsAround[a].isShown = true;
                        console.log(gBoard[coords.i][coords.j].neighborsAround[a].minesAmout)
                    }
                    // elCell.innerText = gBoard[coords.i][coords.j].minesAroundCount;
                    // renderCell(coords, gBoard[coords.i][coords.j].minesAroundCount)
                }
            }
            break;
        case 3: // right click
            if (isFirstClick === false) {
                isFirstClick = true;
                placeRandMines(gLevel.MINES)
                setMinesNegsCount(gBoard)
            }
            var coords = getCellCoord(elCell.toElement.id)
            if (gBoard[coords.i][coords.j].isMarked === true) {
                gBoard[coords.i][coords.j].isMarked = false;
                // console.log(gBoard[coords.i][coords.j])
                renderCell(coords, FLOOR); // need to work on this
            } else {
                gBoard[coords.i][coords.j].isMarked = true;
                renderCell(coords, MARK)
            }
            break;
    }
}


//Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
function cellMarked(elCell) {
    console.log('cellMarked function');
}


// Game ends when all mines are marked and all the other cells are shown
function checkGameOver() {

    console.log('checkGameOver function');
}


// When user clicks a cell with no mines around, we need to open not only that cell, but also its neighbors. 
function expandShown(board, elCell, i, j) {
    console.log('expandShown function')
}

function placeRandMines(num) {
    var minesAmout = 0;
    var minesArray = [];
    while (minesAmout < num) {
        var posI = getRandomInt(0, 4)
        var posJ = getRandomInt(0, 4)
        if (gBoard[posI][posJ].isMine === false) {
            gBoard[posI][posJ].isMine = true;
            minesAmout++
            minesArray.push({ i: posI, j: posJ });
        }
    }
    gMinesArray = minesArray;
}

function minesExplode() {
    for (var m = 0; m < gMinesArray.length; m++) {
        // console.log('Array :', gMinesArray[m])
        gBoard[gMinesArray[m].i][gMinesArray[m].j].isShown = true;
        renderCell(gMinesArray[m], MINE)
    }
    gameOver()
}

function gameOver() {
    console.log('Game Over - User Lose')
}