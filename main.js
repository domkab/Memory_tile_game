'use strict';

const tilesContainer = document.querySelector('.tiles');
const colors = [
  'aqua',
  'aquamarine',
  'crimson',
  'blue',
  'dodgerblue',
  'gold',
  'greenyellow',
  'teal'
];

const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;

// Game state
let revealedCount = 0; // 0 tiles revelead
let activeTile = null; // tile that has been clicked on.
let awaitingEndOfMove = false;

function buildTile(color) {
  const element = document.createElement('div');

  element.classList.add('tile');
  element.setAttribute('data-color', color);
  element.setAttribute('data-revealed', 'false');

  element.addEventListener('click', () => {

    const revealed = element.getAttribute('data-revealed');

    if (
      awaitingEndOfMove
      || revealed === true
      || element === activeTile
      ) {
      return;
    };

    element.style.backgroundColor = color;

    if (!activeTile) {
      activeTile = element;

      return;
    }

    //  no waiting for end of move and there is an active tile.

    const colorToMatch = activeTile.getAttribute('data-color');

    if (colorToMatch === color) {
      activeTile.setAttribute('data-revealed', 'true');
      element.setAttribute('data-revealed', 'true');
      activeTile = null;
      awaitingEndOfMove = false;
      revealedCount += 2;

      if (revealedCount === tileCount) {
        alert('You win! Refresh to play again');
      }

      return;
    }

    awaitingEndOfMove = true;

    setTimeout(() => {
      element.style.backgroundColor = null;
      activeTile.style.backgroundColor = null;
      awaitingEndOfMove = false;
      activeTile = null;
    }, 1000)

  });

  return element;
}

// build up tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
  const color = colorsPicklist[randomIndex];
  const tile = buildTile(color)

  colorsPicklist.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}
