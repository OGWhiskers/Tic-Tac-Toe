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

  return { render, reset, IsXActive, IsOActive };
})();

const displayController = (function () {})();
