const setBoard = document.querySelector('.set-board'),
playBoard = document.querySelector('.play-board'),
allBox = document.querySelectorAll('section span'),
yourBtn = document.querySelector('.your'),
compBtn = document.querySelector('.comp'),
options = document.querySelector('.options'),
startBox = document.querySelector('.start-button'),
startBtn = startBox.querySelector('button'),
solution = document.querySelector('.solution'),
hint = document.querySelector('.hint'),
resetBtn = document.querySelector('.reset')
;

let yourself = false, computer = false, showHint = false, hintCtr = 10;

let matrix = new Array(9);
let solMatrix = new Array(9);
for(let i = 0;i < 9;i++){
    matrix[i] = new Array(9);
    solMatrix[i] = new Array(9);
    for(let j = 0;j < 9;j++){
        matrix[i][j] = -1;
        solMatrix[i][j] = -1;
    }
}
const indexes = new Set(), main_set = new Set();

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute('onclick', 'clickedBox(this)');
    }

    yourBtn.onclick = () => {
        yourself = true;
        setBoard.classList.add('hide');
        playBoard.classList.remove('hide');
        playBoard.classList.add('active');
        startBox.classList.remove('hide');
        startBox.classList.add('active');
        setYour();
    }

    compBtn.onclick = () => {
        computer = true;
        setBoard.classList.add('hide');
        playBoard.classList.remove('hide');
        playBoard.classList.add('active');
        setComp();
    }
    
    hint.onclick = () => {
        // console.log("clicked hint");
        if(hintCtr > 0){
            showHint = true;
        }
        else{
            alert("You are out of hints");
        }
    }
    
    solution.onclick = () =>{
        console.log("clicked solution");
        displaySolution();
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getBoxIdx(i, j){
    let row = Math.floor(i / 3), col = Math.floor(j / 3);
    return row * 3 + col;
}

let started = false;

function setComp(){
    let n = getRndInteger(12, 18); // take this between 10 - 15
    for (let t = 0; t < n; t++) {
        let elem , flag = 0, idx;
        let i, j, str = "", mainstr1 = "", mainstr2 = "", mainstr3 = "";
        while(true){
            i = getRndInteger(0, 8);
            j = getRndInteger(0, 8);
            str = `${i}, ${j}`;
            flag = 0;
            if(indexes.has(str) == false){
                idx = getBoxIdx(i, j);
                for(let temp = 1;temp <= 9;temp++) {
                    let e = getRndInteger(1, 9);
                    mainstr1 = `${e} at row ${i}`;
                    mainstr2 = `${e} at col ${j}`;
                    mainstr3 = `${e} at box ${idx}`;
                    if(main_set.has(mainstr1) || main_set.has(mainstr2) || main_set.has(mainstr3)){
                        continue;
                    }
                    else{
                        main_set.add(mainstr1);
                        main_set.add(mainstr2);
                        main_set.add(mainstr3);
                        elem = e;
                        flag = 1;
                        break;
                    }
                }
                if(flag == 1)
                    break;
            }
        }
        matrix[i][j] = elem;
        indexes.add(str);
    }

    for(i = 0;i < 9;i++){
        for(j = 0;j < 9;j++){
            if(matrix[i][j] != -1){
                allBox[i*9 + j].innerHTML=`<i>${matrix[i][j]}</i>`;
                allBox[i*9 + j].style.pointerEvents = "none";
            }
        }
    }
    options.classList.remove('hide');
    options.classList.add('active');
    started = true;
    console.log(matrix);
    updateSol();
}

function setYour(){
    
    // when setting is completed:
    startBtn.onclick = () =>{
        startBox.classList.add('hide');
        startBox.classList.remove('active');
        options.classList.remove('hide');
        options.classList.add('active');
        started = true;
        updateSol();
    }
}

function is_valid(row, col, e){
    let mainstr1 = "", mainstr2 = "", mainstr3 = "";
    idx = getBoxIdx(row, col);
    mainstr1 = `${e} at row ${row}`;
    mainstr2 = `${e} at col ${col}`;
    mainstr3 = `${e} at box ${idx}`;

    if(main_set.has(mainstr1) || main_set.has(mainstr2) || main_set.has(mainstr3)){
        return false;
    }
    else{
        main_set.add(mainstr1);
        main_set.add(mainstr2);
        main_set.add(mainstr3);
    }
    return true;
}

// ################################### Board handling: ###########################################

function clickedBox(element){
    let box_number = parseInt(element.className.split("box")[1]);
    let row = 0, col = 0;
    row = Math.floor(box_number / 9);
    if(box_number % 9 == 0)
        row--;
    col = box_number % 9 - 1;
    if(col == -1)
        col = 8; // 9 % 9 will be 0 that's why
    
    // Hints handling
    
    if(showHint == true) {
        if(matrix[row][col] == solMatrix[row][col]){
            alert('The entered value is correct So not deducting hints');
            allBox[row * 9 + col].style.pointerEvents = "none";
        }
        else if(matrix[row][col] == -1){
            // alert('The box was empty so wrote a correct value'); // This is optional
            let elem = solMatrix[row][col];
            matrix[row][col] = solMatrix[row][col];
            allBox[row * 9 + col].innerHTML=`<i>${elem}</i>`;
            allBox[row * 9 + col].style.pointerEvents = "none";
            hintCtr--;
        }
        else{
            let elem = solMatrix[row][col];
            matrix[row][col] = solMatrix[row][col];
            allBox[row * 9 + col].innerHTML=`<i>${elem}</i>`;
            allBox[row * 9 + col].style.pointerEvents = "none";
            // alert('The entered value was incorrect so changed it to correct value'); // This is optional
            hintCtr--;
        }
        showHint = false;
        hint.innerHTML = `Hint: <strong> ${hintCtr}</strong> left`;
    }
    else{
        let elem = prompt("enter the number(1-9)");
        if(started == false){
            if(elem >= 1 && elem <= 9){
                if(is_valid(row, col, elem)){
                    matrix[row][col] = elem;
                    allBox[row * 9 + col].innerHTML=`<i>${elem}</i>`;
                    allBox[row * 9 + col].style.pointerEvents = "none";
                }
                else{
                    alert(`You can not enter ${elem} here`);
                }
            }
            else{
                alert("Please enter a valid no.");
            }
        }
        else{
            if(elem >= 1 && elem <= 9){
                matrix[row][col] = elem;
                allBox[row * 9 + col].innerHTML=`<i>${elem}</i>`;
                // allBox[row * 9 + col].style.pointerEvents = "none";
            }
            else{
                alert("Please enter a valid no.");
            }
        }
    }
}

// ##########################################  solution matrix computation:#########################


// solMatrix is available globally

function canPut(elem, row, col) {
    for(let i = 0;i < 9;i++){
        if(solMatrix[row][i] == elem){
            return false;
        }
        if(solMatrix[i][col] == elem){
            return false;
        }
    }
    let rowGroup = Math.floor(row / 3) * 3;
    let colGroup = Math.floor(col / 3) * 3;
    for(let i = rowGroup;i < rowGroup + 3;i++){
        for(let j = colGroup;j < colGroup + 3;j++){
            if(solMatrix[i][j] == elem){
                return false;
            }
        }
    }
    return true;
}

function solveSudokuRec(row, col){
    if(row == 9)
        return true;
    let nextCol, nextRow;
    if (col == 8){
        nextRow = row + 1;
        nextCol = 0;
    }
    else{
        nextRow = row;
        nextCol = col + 1;
    }
    // console.log(row, col);
    if(solMatrix[row][col] != -1){
        return solveSudokuRec(nextRow, nextCol);
    }
    for(let c = 1;c < 10;c++){
        if(canPut(c, row, col)){
            solMatrix[row][col] = c;
            if(solveSudokuRec(nextRow, nextCol)){
                return true;
            }
            solMatrix[row][col] = -1;
        }
    }
    return false;
}

function updateSol(){
    for(let i = 0; i < 9;i++){
        for(let j = 0;j < 9; j++){
            solMatrix[i][j] = matrix[i][j];
        }
    }
    solveSudokuRec(0, 0);
    console.log(solMatrix);
}

function displaySolution(){
    console.log(solMatrix);
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            let elem = solMatrix[i][j];
            allBox[i * 9 + j].innerHTML=`<i>${elem}</i>`;
            allBox[i * 9 + j].style.pointerEvents = "none";
        }
    }
}

resetBtn.onclick = () => {
    window.location.reload();
}