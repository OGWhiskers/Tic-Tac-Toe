"use strict";

const Gameboard = {
  gameboard: ["x", "O"],
};

// MODULE

const chooseAvatar = (function () {
  // DOM

  const btnX = document.querySelector(".btn-x");
  const btnO = document.querySelector(".btn-o");

  // EVENT LISTEN

  btnX.addEventListener("click", () => {
    if (Game.IsXActive) {
      addActive(btnX);
      removeActive(btnO);
    }
    Game.reset();
  });
  btnO.addEventListener("click", () => {
    if (!Game.IsOActive) {
      addActive(btnO);
      removeActive(btnX);
    }
    Game.reset();
  });

  // FUNCTIONS :

  const addActive = (btn) => btn.classList.add("btn-active");

  const removeActive = (btn) => btn.classList.remove("btn-active");

  return { addActive, removeActive, btnO, btnX };
})();

// SEPARATE :

const Game = (function () {
  const elements = document.querySelectorAll(".tiles");
  let IsXActive = chooseAvatar.btnX.classList.contains("btn-active");
  let IsOActive = chooseAvatar.btnO.classList.contains("btn-active");

  // event listeners

  elements.forEach((node) => {
    node.addEventListener("click", () => {
      Game.render(node.classList[0], activeAvatar());
    });
  });

  // methods

  const remove = chooseAvatar.removeActive;
  const add = chooseAvatar.addActive;

  const reset = () => {
    IsXActive = chooseAvatar.btnX.classList.contains("btn-active");
    IsOActive = chooseAvatar.btnO.classList.contains("btn-active");
  };

  const activeAvatar = () => {
    if (IsXActive) {
      return Gameboard.gameboard[0];
    } else if (IsOActive) {
      return Gameboard.gameboard[1];
    }

    reset();
  };

  function _swicthAvatar() {
    if (IsXActive) {
      remove(chooseAvatar.btnX);
      add(chooseAvatar.btnO);
    } else if (IsOActive) {
      remove(chooseAvatar.btnO);
      add(chooseAvatar.btnX);
    }

    reset();
  }

  function render(position, avatar) {
    let doc = document.querySelector(`.${position}`);
    let ava = document.createElement("p");

    if (doc.textContent == "") {
      ava.setAttribute("id", "avatar");
      doc.appendChild(ava);
      ava.textContent = avatar;
      _swicthAvatar();
    }

    if (
      elements[0].lastElementChild != null &&
      elements[1].lastElementChild != null &&
      elements[2].lastElementChild != null &&
      elements[3].lastElementChild != null &&
      elements[4].lastElementChild != null &&
      elements[5].lastElementChild != null &&
      elements[6].lastElementChild != null &&
      elements[7].lastElementChild != null &&
      elements[8].lastElementChild != null
    ) {
      displayWinner.tieEffects();
    }
  }

  return { render, reset, IsXActive, IsOActive, elements };
})();

// SEPARATE :

const decideWinner = (function () {
  let row1 = [];
  let row2 = [];
  let row3 = [];

  let col1 = [];
  let col2 = [];
  let col3 = [];

  let diagonal1 = [];
  let diagonal2 = [];

  Game.elements.forEach((node) => {
    let contains = (div) => {
      return node.classList.contains(div);
    };

    if (contains("div-1") || contains("div-2") || contains("div-3")) {
      row1.push(node);
    } else if (contains("div-4") || contains("div-5") || contains("div-6")) {
      row2.push(node);
    } else if (contains("div-7") || contains("div-8") || contains("div-9")) {
      row3.push(node);
    }

    if (contains("div-1") || contains("div-4") || contains("div-7")) {
      col1.push(node);
    } else if (contains("div-2") || contains("div-5") || contains("div-8")) {
      col2.push(node);
    } else if (contains("div-3") || contains("div-6") || contains("div-9")) {
      col3.push(node);
    }

    if (contains("div-1") || contains("div-5") || contains("div-9")) {
      diagonal1.push(node);
    }

    if (contains("div-3") || contains("div-5") || contains("div-7")) {
      diagonal2.push(node);
    }
    // Event listerner:

    node.addEventListener("click", () => {
      winnigCondition();
    });
  });

  const winnigCondition = () => {
    let xWin = (pos) => {
      return pos.textContent == "x";
    };

    let oWin = (pos) => {
      return pos.textContent == "O";
    };

    const checkXwin = (direc) => {
      return xWin(direc[0]) && xWin(direc[1]) && xWin(direc[2]);
    };
    const checkOwin = (direc) => {
      return oWin(direc[0]) && oWin(direc[1]) && oWin(direc[2]);
    };

    console.log();
    if (checkXwin(row1)) displayWinner.winEffects("X");
    else if (checkOwin(row1)) displayWinner.winEffects("O");
    else if (checkXwin(row2)) displayWinner.winEffects("X");
    else if (checkOwin(row2)) displayWinner.winEffects("O");
    else if (checkXwin(row3)) displayWinner.winEffects("X");
    else if (checkOwin(row3)) displayWinner.winEffects("O");
    else if (checkXwin(col1)) displayWinner.winEffects("X");
    else if (checkOwin(col1)) displayWinner.winEffects("O");
    else if (checkXwin(col2)) displayWinner.winEffects("X");
    else if (checkOwin(col2)) displayWinner.winEffects("O");
    else if (checkXwin(col3)) displayWinner.winEffects("X");
    else if (checkOwin(col3)) displayWinner.winEffects("O");
    else if (checkXwin(diagonal1)) displayWinner.winEffects("X");
    else if (checkOwin(diagonal1)) displayWinner.winEffects("O");
    else if (checkXwin(diagonal2)) displayWinner.winEffects("X");
    else if (checkOwin(diagonal2)) displayWinner.winEffects("O");
  };
})();

// SEPARATE :

const displayWinner = (function () {
  // DOM :

  const overlay = document.querySelector(".overlay");
  const messageContainer = document.querySelector(".win-msg");
  const message = document.querySelector(".msg");

  // FUNCTIONS :

  const addHidden = (...el) => {
    el.forEach((el) => el.classList.add("hidden"));
  };
  const removeHidden = (...el) => {
    el.forEach((el) => el.classList.remove("hidden"));
  };

  const winEffects = (winner) => {
    removeHidden(overlay, messageContainer, message);
    message.textContent = `Congratulations player ${winner} has won!!!`;
  };

  const tieEffects = () => {
    removeHidden(overlay, messageContainer, message);
    message.textContent = `Game is tied :(, try again.`;
  };

  // EVENT LISTENER :

  overlay.addEventListener("click", () => {
    addHidden(overlay, messageContainer, message);
    restartGame.restart();
  });

  messageContainer.addEventListener("click", () => {
    addHidden(overlay, messageContainer, message);
    restartGame.restart();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") {
      addHidden(overlay, messageContainer, message);
      restartGame.restart();
    }
  });

  return { winEffects, tieEffects };
})();

// SEPARATE :

const restartGame = (function () {
  const restartBtn = document.querySelector(".restart");

  restartBtn.addEventListener("click", restart);

  function restart() {
    Game.elements.forEach((node) => {
      node.textContent = "";
    });
    chooseAvatar.addActive(chooseAvatar.btnX);
    chooseAvatar.removeActive(chooseAvatar.btnO);
    Game.reset();
  }

  return { restart };
})();
