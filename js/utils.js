'use strict';

// Render the board as a <table> to the page
function renderBoard(board) {
    var strHTML = '<table border="1"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = FLOOR;
            // if (board[i][j].isShown === true) { var cell = MINE }
            var className = 'cell-' + i + '-' + j;
            strHTML += '<td id="' + className + '" onmousedown="cellClicked(event)" class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML = strHTML;
}


// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}


// count negs for specifiec cell
function countNegs(posI, posJ) {
    var neighborsCount = 0
    var neighborsArray = []
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            if (i === posI && j === posJ) continue;
            neighborsArray.push({i: i, j: j})
            if (gBoard[i][j].isMine === true) {
                gBoard[posI][posJ].minesAroundCount++
                neighborsCount++
            }
        }
    }
    return neighborsArray
}


function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    // console.log('HERE :', `.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value;
}

//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}