"use strict";

const Gameboard = {
  gameboard: ["x", "O"],
};

// FACTORY
const Players = () => {};

// MODULE

const Game = (function () {
  const X = document.querySelector(".x");
  const O = document.querySelector(".o");
  const elements = document.querySelectorAll(".tiles");

  const btnX = document.querySelector(".btn-x");
  const btnO = document.querySelector(".btn-o");

  // event listeners

  elements.forEach((node) => {
    node.addEventListener("click", () => {
      Game.render(node.classList[0], Gameboard.gameboard[0]);
    });
  });

  btnX.addEventListener("click", () => {
    btnX.classList.add("btn-active");
    btnO.classList.remove("btn-active");
    toggleChoice(btnX, btnO);
  });
  btnO.addEventListener("click", () => {
    btnO.classList.add("btn-active");
    btnX.classList.remove("btn-active");
    toggleChoice(btnX, btnO);
  });

  // methods

  function _swicthAvatar() {}

  function render(position, avatar) {
    let doc = document.querySelector(`.${position}`);
    let ava = document.createElement("p");
    ava.setAttribute("id", "avatar");
    doc.appendChild(ava);
    ava.textContent = avatar;
    _swicthAvatar();
  }

  const toggleChoice = (btn1, btn2) => {
    if (btn1.classList.contains("btn-active")) {
      btn2.classList.remove("btn-active");
    } else if (btn2.classList.contains("btn-active")) {
      btn1.classList.remove("btn-active");
    }
  };

  return { render };
})();

const displayController = (function () {})();
