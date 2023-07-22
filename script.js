"use strict";

const Gameboard = {
  gameboard: ["x", "O"],
};

// FACTORY
const Players = () => {};

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
    ava.setAttribute("id", "avatar");
    doc.appendChild(ava);
    ava.textContent = avatar;
    _swicthAvatar();
  }

  return { render, reset, IsXActive, IsOActive, elements };
})();

// SEPARATE :

const displayWinner = (function () {
  //  IF X OR O ARE IN POSITION (DIFFERENT WINNING CONDITIONS DISPLAY MESSAGE)

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

    node.addEventListener("click", (e) => {
      winnigCondition(e);
    });
  });

  const winnigCondition = (e) => {
    let xWin = (pos) => {
      return pos.textContent == "x";
    };

    let oWin = (pos) => {
      return pos.textContent == "O";
    };

    const checkWin = (direc) => {
      return (
        (xWin(direc[0]) && xWin(direc[1]) && xWin(direc[2])) ||
        (oWin(direc[0]) && oWin(direc[1]) && oWin(direc[2]))
      );
    };

    if (checkWin(row1)) {
      console.log(`You have won`);
    } else if (checkWin(row2)) {
      console.log(`You have won`);
    } else if (checkWin(row3)) {
      console.log(`You have won`);
    } else if (checkWin(col1)) {
      console.log(`You have won`);
    } else if (checkWin(col2)) {
      console.log(`You have won`);
    } else if (checkWin(col3)) {
      console.log(`You have won`);
    } else if (checkWin(diagonal1)) {
      console.log(`You have won`);
    } else if (checkWin(diagonal2)) {
      console.log(`You have won`);
    }
  };
})();
