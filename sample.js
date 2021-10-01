function getClass(idname){
    return document.querySelector(".box" + idname).id;
    // basically it will return 'X' or 'O' (id values)
}
function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function selectWinner(){
    if(checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign)
    || checkClass(7, 8, 9, playerSign) || checkClass(3, 5, 7, playerSign) 
    || checkClass(1, 5, 9, playerSign) || checkClass(1, 4, 7, playerSign)
    || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign)
    ){
        runBot = false; // to stop the match right there
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }
    else{
        let array = [];
        for (let i = 0; i < allBox.length; i++) {
            if(allBox[i].childElementCount == 0){ // span has no child(unclicked)
                array.push(i); // so inserting them
            }
        }
        if(array.length == 0){
            // draw
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);
            wonText.innerHTML = `Game Drawn!`;
        }
    }
}