'use strict';

const field = document.querySelector('.field');
const player = {
   maxHealth: 10,
   health: 1,
   attackPower: 1,
}

// ===================
// Параметры для класса
const maxWidth = 40,
   maxHeight = 24;
// ===================

for (let i = 1; i < maxWidth * maxHeight; i++) {
   const tile = document.createElement('div');
   tile.className = 'tile';
   field.append(tile);
}


let arrField = [...field.children]; // == Array.from()

console.log(arrField);

document.addEventListener('keydown', event => {
   const playerTile = document.querySelector('.tileP');
   const currentTile = arrField.indexOf(playerTile);

   // направо
   if (event.code == 'KeyD' && (currentTile == 0 || (currentTile + 1) % maxWidth != 0)) {
      const nextTile = arrField[currentTile + 1];

      setPlayerState(nextTile.className);
      setTileState(arrField[currentTile], nextTile);
   }

   // налево
   if (event.code == 'KeyA' && (currentTile % maxWidth != 0)) {
      const nextTile = arrField[currentTile - 1];

      setPlayerState(nextTile.className);
      setTileState(arrField[currentTile], nextTile);
   }

   // вниз
   if (event.code == 'KeyS' && (currentTile + maxWidth < arrField.length)) {
      const nextTile = arrField[currentTile + maxWidth];

      setPlayerState(nextTile.className);
      setTileState(arrField[currentTile], nextTile);
   }

   // вверх
   if (event.code == 'KeyW' && (currentTile - maxWidth >= 0)) {
      const nextTile = arrField[currentTile - maxWidth];

      setPlayerState(nextTile.className);
      setTileState(arrField[currentTile], nextTile);
   }

   if (event.code == 'Space') {
      event.preventDefault();
      onAttack(currentTile);
   }
});

function setPlayerState(classTile) {
   switch (classTile) {
      case 'tileHP':
         if (player.health < player.maxHealth) {  // * фиксированный порог HP
            player.health = player.health + 1;
         }
         console.log(player);
         break;

      case 'tileSW':
         player.attackPower = player.attackPower + 1;
         console.log(player);
         break;
   }
}

function setTileState(currentTile, nextTile) {
   currentTile.innerHTML = '';
   currentTile.className = 'tile';
   nextTile.className = 'tileP';

   const health = document.createElement('div');
   health.className = 'health';
   health.style.width = `${player.health * 100 / player.maxHealth}%`;
   nextTile.append(health);
}

function onAttack(currentTile) {
   const attackArea = [
      // arrField[currentTile - maxWidth - 1],
      // arrField[currentTile - maxWidth],
      // arrField[currentTile - maxWidth + 1],
      // arrField[currentTile - 1],
      // arrField[currentTile + 1],
      // arrField[currentTile + maxWidth - 1],
      // arrField[currentTile + maxWidth],
      // arrField[currentTile + maxWidth + 1]

      // currentTile - maxWidth - 1,
      // currentTile - maxWidth,
      // currentTile - maxWidth + 1,
      // currentTile - 1,
      // currentTile + 1,
      // currentTile + maxWidth - 1,
      // currentTile + maxWidth,
      // currentTile + maxWidth + 1
   ];

   // правый тайл
   if (arrField[currentTile + 1] !== 'undefined' && (currentTile + 1) % maxWidth != 0) {
      attackArea.push(arrField[currentTile + 1]);
   }
   // левый тайл
   if (arrField[currentTile - 1] !== 'undefined' && (currentTile % maxWidth != 0)) {
      attackArea.push(arrField[currentTile - 1]);
   }
   // нижний тайл
   if (arrField[currentTile + maxWidth] !== 'undefined' && (currentTile + maxWidth < arrField.length)) {
      attackArea.push(arrField[currentTile + maxWidth]);
   }
   // верхний тайл
   if (arrField[currentTile - maxWidth] !== 'undefined' && (currentTile - maxWidth >= 0)) {
      attackArea.push(arrField[currentTile - maxWidth]);
   }
   // нижний правый тайл
   if (arrField[currentTile + maxWidth] !== 'undefined' && (currentTile + maxWidth < arrField.length) && (currentTile + 1) % maxWidth != 0) {
      attackArea.push(arrField[currentTile + maxWidth + 1]);
   }
   // нижний левый тайл
   if (arrField[currentTile + maxWidth] !== 'undefined' && (currentTile + maxWidth < arrField.length) && currentTile % maxWidth != 0) {
      attackArea.push(arrField[currentTile + maxWidth - 1]);
   }
   // верхний правый тайл
   if (arrField[currentTile - maxWidth] !== 'undefined' && (currentTile - maxWidth >= 0) && (currentTile + 1) % maxWidth != 0) {
      attackArea.push(arrField[currentTile - maxWidth + 1]);
   }
   // верхний левый тайл
   if (arrField[currentTile - maxWidth] !== 'undefined' && (currentTile - maxWidth >= 0) && currentTile % maxWidth != 0) {
      attackArea.push(arrField[currentTile - maxWidth - 1]);
   }



   // console.log(attackArea);

   attackArea.forEach(item => {
      if (item.classList.contains('tileE')) {
         console.log(item);
      }
   });
}



console.log(player);