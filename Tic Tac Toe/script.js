const selectMode = document.querySelector(".mode-box"),
  hardMode = selectMode.querySelector(".hard"),
  easyMode = selectMode.querySelector(".easy"),
  player2Mode = selectMode.querySelector(".player2"), // till here selecting the modes variables
  selectBox = document.querySelector(".select-box"),
  selectXbtn = selectBox.querySelector(".playerX"),
  selectObtn = selectBox.querySelector(".playerO"),
  playBoard = document.querySelector(".play-board"),
  allBox = document.querySelectorAll("section span"),
  players = document.querySelector(".players"),
  resultBox = document.querySelector(".result-box"),
  wonText = document.querySelector(".won-text"),
  replayBtn = document.querySelector(".btn button");
let hard = 0,
  easy = 0,
  player2 = 0;

let ai = "X",
  human = "O";
let scores = {
  X: 10,
  O: -10,
  Draw: 0,
};
function setPlayers() {
  if (human == "X") {
    ai = "O";
  }
  if (ai == "O") {
    scores = {
      X: -10,
      O: 10,
      Draw: 0,
    };
  }
}

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }

  hardMode.onclick = () => {
    selectMode.classList.add("hide");
    selectBox.classList.add("show");
    hard = 1;
    selectPlayer();
  };

  easyMode.onclick = () => {
    selectMode.classList.add("hide");
    selectBox.classList.add("show");
    easy = 1;
    selectPlayer();
  };

  player2Mode.onclick = () => {
    selectMode.classList.add("hide");
    selectBox.classList.add("show");
    player2 = 1;
    selectPlayer();
  };
};

function selectPlayer() {
  selectXbtn.onclick = () => {
    selectBox.classList.add("hide"); // hide the select box when playerX button clicked
    playBoard.classList.add("show"); // show the play board when same condition
    // players.classList.add('active');
    human = "X";
    setPlayers();
  };

  selectObtn.onclick = () => {
    selectBox.classList.add("hide"); // hide the select box when playerO button clicked
    playBoard.classList.add("show");
    // players.classList.add('active', 'player');
    players.setAttribute("class", "players active player"); // another way of doing the above thing.
    human = "O";
  };
  setPlayers();
}

// ##########################################function for hard mode starts here################################

function result(board) {
  // 2-d board
  let flag_x = 0,
    flag_o = 0;
  for (let i = 0; i < 3; i++) {
    const ch = board[i][0];
    if (ch === " ") {
      continue;
    }
    let row_ctr = 0;
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === ch) {
        row_ctr++;
      }
    }
    if (row_ctr === 3) {
      if (ch === "X") flag_x = 1;
      else if (ch === "O") flag_o = 1;
      break;
    }
  }
  if (flag_o === 1) {
    return "O";
  } else if (flag_x === 1) return "X";
  // for coloumn
  for (let i = 0; i < 3; i++) {
    const ch = board[0][i];
    if (ch === " ") {
      continue;
    }
    let col_ctr = 0;
    for (let j = 0; j < 3; j++) {
      if (board[j][i] === ch) {
        col_ctr++;
      }
    }
    if (col_ctr === 3) {
      if (ch === "X") flag_x = 1;
      else if (ch === "O") flag_o = 1;
      break;
    }
  }
  if (flag_o === 1) {
    return "O";
  } else if (flag_x === 1) {
    return "X";
  }
  // console.log(board[0][2], board[1][1], board[2][0]);
  // console.log(board[0][2] === board[1][1] && board[1][1] === board[2][0]);
  if (
    (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
    (board[0][2] === board[1][1] && board[1][1] === board[2][0])
  ) {
    // console.log("came here");
    if (board[1][1] === "X") {
      return "X";
    }
    if (board[1][1] === "O") {
      return "O";
    }
  }
  if (flag_o === 1) {
    return "O";
  }
  if (flag_x === 1) {
    return "X";
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) if (board[i][j] === " ") return "";
  }
  return "Draw";
}

function mini_max(depth, board, alpha, beta, maximizing) {
  let check_res = result(board);
  if (check_res !== "") return scores[check_res];

  if (maximizing) {
    let best_score = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === " ") {
          board[i][j] = ai;
          let score = mini_max(depth + 1, board, alpha, beta, false);
          board[i][j] = " ";
          best_score = Math.max(score, best_score);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) {
            break;
          }
        }
      }
      if (beta <= alpha) {
        break;
      }
    }
    return best_score;
  } else {
    let best_score = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === " ") {
          board[i][j] = human;
          let score = mini_max(depth + 1, board, alpha, beta, true);
          board[i][j] = " ";
          best_score = Math.min(score, best_score);
          beta = Math.min(beta, score);
          if (beta <= alpha) {
            break;
          }
        }
      }
      if (beta <= alpha) {
        break;
      }
    }
    return best_score;
  }
}

function bestMove(board) {
  let best_score = -Infinity; // -infinty
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      ctr = 0;
      if (board[i][j] === " ") {
        board[i][j] = ai;
        let score = mini_max(0, board, -Infinity, Infinity, false);
        board[i][j] = " ";
        if (score > best_score) {
          best_score = score;
          move = [i, j];
        }
      }
    }
  }
  return move;
}
// ########################################## function for hard mode ends here ################################

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;
// player 1
let turn = 1;

function player2Turn(element) {
  playerSign = "O";
  if (players.classList.contains("player")) {
    element.innerHTML = `<i class="${playerXIcon}"></i>`;
    players.classList.add("active"); // remove (maybe) // this is to improve the slider position
    // players.classList.remove('active');
    playerSign = "X";
    element.setAttribute("id", playerSign);
  } else {
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.remove("active");
    element.setAttribute("id", playerSign);
  }
  turn = 1;
  selectWinner();
  playerSign = "X";
  element.style.pointerEvents = "none";
}

function clickedBox(element) {
  // console.log(element);
  if (turn == 1) {
    if (players.classList.contains("player")) {
      playerSign = "O";
      element.innerHTML = `<i class="${playerOIcon}"></i>`;
      players.classList.add("active");
      element.setAttribute("id", playerSign);
      players.classList.remove("active"); // remove(maybe) this is to improve the slider position
      turn = 0;
    } else {
      element.innerHTML = `<i class="${playerXIcon}"></i>`;
      players.classList.add("active");
      element.setAttribute("id", playerSign);
      turn = 0;
    }
    selectWinner();
    // playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none"; // so that the button can't be clicked again
  } else {
    player2Turn(element);
  }

  if (player2 != 1) {
    playBoard.style.pointerEvents = "none";
    let randomDelayTime = (Math.random() * 1000 + 200).toFixed(); // delete this when writing code for AI
    setTimeout(() => {
      bot(runBot);
    }, randomDelayTime);
  }
}

function bot(runbot) {
  turn = 1;
  if (runbot) {
    if (hard == 1) {
      // console.log(AI, human);
      playerSign = "O";
      let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
      ];
      let empty_ctr = 0;
      let chr = " ",
        idx1 = 0,
        idx2 = 0;
      for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount != 0) {
          // it contains either 'X' or 'O'
          chr = getClass(i + 1);
          idx1 = Math.floor(i / 3);
          idx2 = i % 3;
          // console.log(chr);
          board[idx1][idx2] = chr;
          empty_ctr++;
        }
      }
      // console.log(board);
      index_pair = bestMove(board);
      index = index_pair[0] * 3 + index_pair[1];
      // console.log(index);
      if (empty_ctr > 0) {
        if (players.classList.contains("player")) {
          allBox[index].innerHTML = `<i class="${playerXIcon}"></i>`;
          players.classList.add("active"); // remove (maybe) // this is to improve the slider position
          // players.classList.remove('active');
          playerSign = "X";
          allBox[index].setAttribute("id", playerSign);
        } else {
          allBox[index].innerHTML = `<i class="${playerOIcon}"></i>`;
          players.classList.remove("active");
          allBox[index].setAttribute("id", playerSign);
        }
        selectWinner();
      }
      allBox[index].style.pointerEvents = "none";
      playBoard.style.pointerEvents = "auto";
      playerSign = "X";
    } else if (easy == 1) {
      playerSign = "O";
      let array = []; // for storing unselected box in this
      for (let i = 0; i < allBox.length; i++) {
        if (allBox[i].childElementCount == 0) {
          // span has no child(unclicked)
          array.push(i); // so inserting them
        }
      }
      let randomBox = array[Math.floor(Math.random() * array.length)]; // random index for
      // console.log(randomBox);
      if (array.length > 0) {
        if (players.classList.contains("player")) {
          allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
          players.classList.add("active"); // remove (maybe) // this is to improve the slider position
          // players.classList.remove('active');
          playerSign = "X";
          allBox[randomBox].setAttribute("id", playerSign);
        } else {
          allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
          players.classList.remove("active");
          allBox[randomBox].setAttribute("id", playerSign);
        }
        selectWinner();
      }
      allBox[randomBox].style.pointerEvents = "none";
      playBoard.style.pointerEvents = "auto";
      playerSign = "X";
    }
  }
}

// for winner ->

function getClass(idname) {
  return document.querySelector(".box" + idname).id;
  // basically it will return 'X' or 'O' (id values)
}

function checkClass(val1, val2, val3, sign) {
  if (
    getClass(val1) == sign &&
    getClass(val2) == sign &&
    getClass(val3) == sign
  ) {
    return true;
  }
}

function selectWinner() {
  if (
    checkClass(1, 2, 3, playerSign) ||
    checkClass(4, 5, 6, playerSign) ||
    checkClass(7, 8, 9, playerSign) ||
    checkClass(3, 5, 7, playerSign) ||
    checkClass(1, 5, 9, playerSign) ||
    checkClass(1, 4, 7, playerSign) ||
    checkClass(2, 5, 8, playerSign) ||
    checkClass(3, 6, 9, playerSign)
  ) {
    runBot = false; // to stop the match right there
    bot(runBot);
    setTimeout(() => {
      playBoard.classList.remove("show");
      resultBox.classList.add("show");
    }, 700);

    wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
  } else {
    let array = [];
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        // span has no child(unclicked)
        array.push(i); // so inserting them
      }
    }
    if (array.length == 0) {
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

replayBtn.onclick = () => {
  window.location.reload();
};
