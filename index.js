'use strict';

const field = document.querySelector('.field');

// const player = {
//    tile: 'tileP',
//    maxHealth: 10,
//    health: 5,
//    attackPower: 5,
// };

class Player {
   name = 'p-1';

   state = {
      tile: 'tileP',
      maxHealth: 10,
      health: 5,
      attackPower: 1,
   }
};

const player = new Player();

class Enemy {
   constructor(name) {
      this.name = name;
   };

   state = {
      tile: 'tileE',
      maxHealth: 3,
      health: 3,
      attackPower: 1
   };

   enemyTile() {
      return document.getElementById(this.name);
   };

   currentTile() {
      return arrayField.indexOf(document.getElementById(this.name));
   };

};

// ===================
const maxWidth = 40,
   maxHeight = 24;
// ===================

for (let i = 0; i < maxWidth * maxHeight; i++) {
   const tile = document.createElement('div');

   if (i == 0) {
      tile.className = 'tileP';
      field.append(tile);
   } else if (i == 47 || i == 15 || i == 14 || i == 40) {
      tile.className = 'tileE';
      tile.id = `e-${i}`;
      field.append(tile);
   } else if (i == 2) {
      tile.className = 'tileHP';
      field.append(tile);
   } else if (i == 1) {
      tile.className = 'tileSW';
      field.append(tile);
   }
   else {
      tile.className = 'tile';
      field.append(tile);
   }
}


const arrayField = [...field.children]; // == Array.from()
const collectionEnemy = document.querySelectorAll('.tileE');
// console.log(arrayField);

// ===================
// arrey enemy
let arrayEnemy = [];
collectionEnemy.forEach(item => {
   arrayEnemy.push(new Enemy(item.id));

});
// console.log(arrayEnemy); 
// console.log(arrayEnemy[0].name);
// ===================

function randomSide(min, max) {
   const rand = min + Math.random() * (max + 1 - min);
   return Math.floor(rand);
}

function onMove(char) {
   const currentTile = char.currentTile();
   const side = randomSide(1, 4);

   // направо
   if (side == 1 && (currentTile == 0 || (currentTile + 1) % maxWidth != 0)) {
      const nextTile = arrayField[currentTile + 1];

      // setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, char);
   }
   // налево
   if (side == 2 && (currentTile % maxWidth != 0)) {
      const nextTile = arrayField[currentTile - 1];

      // setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, char);
   }
   // вниз
   if (side == 3 && (currentTile + maxWidth < arrayField.length)) {
      const nextTile = arrayField[currentTile + maxWidth];

      // setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, char);
   }
   // вверх
   if (side == 4 && (currentTile - maxWidth >= 0)) {
      const nextTile = arrayField[currentTile - maxWidth];

      // setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, char);
   }
}


document.addEventListener('keydown', event => {
   const playerTile = document.querySelector('.tileP');
   const currentTile = arrayField.indexOf(playerTile);

   // направо
   if (event.code == 'KeyD' && (currentTile == 0 || (currentTile + 1) % maxWidth != 0)) {
      const nextTile = arrayField[currentTile + 1];

      setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, player);

      enemyAction();

   }
   // налево
   if (event.code == 'KeyA' && (currentTile % maxWidth != 0)) {
      const nextTile = arrayField[currentTile - 1];

      setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, player);

      enemyAction();

   }
   // вниз
   if (event.code == 'KeyS' && (currentTile + maxWidth < arrayField.length)) {
      const nextTile = arrayField[currentTile + maxWidth];

      setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, player);

      enemyAction();

   }
   // вверх
   if (event.code == 'KeyW' && (currentTile - maxWidth >= 0)) {
      const nextTile = arrayField[currentTile - maxWidth];

      setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, player);

      enemyAction();

   }

   if (event.code == 'Space') {
      event.preventDefault();
      onAttack(currentTile);



      enemyAction();
   }
});

function setPlayerState(classTile) {
   switch (classTile) {
      case 'tileHP':
         if (player.state.health < player.state.maxHealth) {  // * фиксированное
            player.state.health = player.state.health + 1;
         }
         console.log(player);
         break;

      case 'tileSW':
         player.state.attackPower = player.state.attackPower + 1;
         console.log(player);
         break;
   }
}

function setTileState(currentTile, nextTile, char) {
   const health = document.createElement('div');
   health.className = 'health';
   health.style.width = `${char.state.health * 100 / char.state.maxHealth}%`;


   if (arrayField.indexOf(currentTile) == arrayField.indexOf(nextTile)) {

      console.log('== stay');

      currentTile.innerHTML = '';
      currentTile.append(health);
   }
   if ((arrayField.indexOf(currentTile) != arrayField.indexOf(nextTile))
      && !(nextTile.classList.contains('tileE') || nextTile.classList.contains('tileW') || nextTile.classList.contains('tileP'))
      && char.state.health > 0) {
      currentTile.innerHTML = '';
      currentTile.className = 'tile';
      currentTile.removeAttribute('id');
      nextTile.className = char.state.tile;
      nextTile.id = char.name;
      nextTile.append(health);
   }
}

function enemyAction() {
   // set enemy HP
   arrayEnemy.forEach(char => {
      // setTileState(char.enemyTile(), char.enemyTile(), char);

      onMove(char);
   });



}

function onAttack(currentTile) {
   const attackArea = [];
   // правый тайл
   if (arrayField[currentTile + 1] !== 'undefined' && (currentTile + 1) % maxWidth != 0) {
      attackArea.push(arrayField[currentTile + 1]);
   }
   // левый тайл
   if (arrayField[currentTile - 1] !== 'undefined' && (currentTile % maxWidth != 0)) {
      attackArea.push(arrayField[currentTile - 1]);
   }
   // нижний тайл
   if (arrayField[currentTile + maxWidth] !== 'undefined' && (currentTile + maxWidth < arrayField.length)) {
      attackArea.push(arrayField[currentTile + maxWidth]);
   }
   // верхний тайл
   if (arrayField[currentTile - maxWidth] !== 'undefined' && (currentTile - maxWidth >= 0)) {
      attackArea.push(arrayField[currentTile - maxWidth]);
   }
   // нижний правый тайл
   if (arrayField[currentTile + maxWidth] !== 'undefined' && (currentTile + maxWidth < arrayField.length) && (currentTile + 1) % maxWidth != 0) {
      attackArea.push(arrayField[currentTile + maxWidth + 1]);
   }
   // нижний левый тайл
   if (arrayField[currentTile + maxWidth] !== 'undefined' && (currentTile + maxWidth < arrayField.length) && currentTile % maxWidth != 0) {
      attackArea.push(arrayField[currentTile + maxWidth - 1]);
   }
   // верхний правый тайл
   if (arrayField[currentTile - maxWidth] !== 'undefined' && (currentTile - maxWidth >= 0) && (currentTile + 1) % maxWidth != 0) {
      attackArea.push(arrayField[currentTile - maxWidth + 1]);
   }
   // верхний левый тайл
   if (arrayField[currentTile - maxWidth] !== 'undefined' && (currentTile - maxWidth >= 0) && currentTile % maxWidth != 0) {
      attackArea.push(arrayField[currentTile - maxWidth - 1]);
   }


   // console.log(attackArea);

   attackArea.forEach(item => {
      if (item.classList.contains('tileE')) {
         // console.log(item);

         for (let i = 0; i < arrayEnemy.length; i++) {
            if (item.id == arrayEnemy[i].name) {
               arrayEnemy[i].state.health = arrayEnemy[i].state.health - 1;


               if (arrayEnemy[i].state.health == 0) {
                  item.innerHTML = '';
                  item.className = 'tile';
                  item.removeAttribute('id');
               }
            }
         }

      }
   });
}



console.log(player);