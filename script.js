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

  elements.forEach((node) => {
    node.addEventListener("click", () => {
      Game.render(node.classList[0], Gameboard.gameboard[0]);
    });
  });

  function render(position, avatar) {
    document.querySelector(`.${position}`).textContent = avatar;
  }

  return { render };
})();

Game.render(Gameboard.gameboard);

const displayController = (function () {})();
