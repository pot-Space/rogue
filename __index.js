'use strict';

const field = document.querySelector('.field');
const player = {
   maxHealth: 10,
   health: 1,
   attackPower: 1,
}

// ===================
const maxWidth = 40,
   maxHeight = 24;
// ===================

let arrayField = [];


for (let i = 0; i < maxHeight; i++) {
   arrayField.push([]);

   for (let j = 0; j < maxWidth; j++) {
      const tile = document.createElement('div');

      if (i == 0 && j == 1) {
         tile.className = 'tileP';
         field.append(tile);
         arrayField[i].push('tileP');

      } else {
         tile.className = 'tile';
         field.append(tile);
         arrayField[i].push('tile');
      }
   }
}

function getCurrentTile() {
   let currentTileRow = '',
      currentTileCol = '';

   for (let i = 0; i < arrayField.length; i++) {
      for (let j = 0; j < arrayField[i].length; j++) {
         if (arrayField[i].includes('tileP')) {
            currentTileRow = i;
            currentTileCol = arrayField[i].indexOf('tileP');
            break;
         }
      }
   }
   return [currentTileRow, currentTileCol];
}


document.addEventListener('keydown', event => {
   // const playerTile = document.querySelector('.tileP');
   const currentTileRow = +getCurrentTile()[0],
      currentTileCol = +getCurrentTile()[1];

   console.log(getCurrentTile());


   // направо
   if (event.code == 'KeyD' && currentTileCol < arrayField[currentTileRow].length - 1) {
      // arrayField[currentTileRow].splice(currentTileCol, 1, 'tile');
      // arrayField[currentTileRow].splice(currentTileCol + 1, 1, 'tileP');
      arrayField[currentTileRow][currentTileCol + 1] = arrayField[currentTileRow][currentTileCol];
      arrayField[currentTileRow][currentTileCol] = 'tile';

      setTileState(currentTileRow, currentTileCol + 1);

      console.log(arrayField);
   }

   // налево
   if (event.code == 'KeyA' && currentTileCol > 0) {
      // arrayField[currentTileRow].splice(currentTileCol, 1, 'tile');
      // arrayField[currentTileRow].splice(currentTileCol - 1, 1, 'tileP');

      arrayField[currentTileRow][currentTileCol - 1] = arrayField[currentTileRow][currentTileCol];
      arrayField[currentTileRow][currentTileCol] = 'tile';

      setTileState(currentTileRow, currentTileCol - 1);

      console.log(arrayField[currentTileRow]);
   }

   // вниз
   if (event.code == 'KeyS') {
      arrayField[currentTileRow][currentTileCol] = arrayField[currentTileRow + 1][currentTileCol];
      arrayField[currentTileRow][currentTileCol] = 'tile';

      setTileState(currentTileRow + 1, currentTileCol);

      console.log(arrayField);
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



function setTileState(newTileRow, newTileCol) {
   field.innerHTML = '';

   for (let i = 0; i < maxHeight; i++) {

      for (let j = 0; j < maxWidth; j++) {
         const tile = document.createElement('div');

         if (i == newTileRow && j == newTileCol) {
            tile.className = 'tileP';
            field.append(tile);

         } else {
            tile.className = 'tile';
            field.append(tile);
         }
      }
   }

}

console.log(arrayField);