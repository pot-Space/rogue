'use strict';

// =================
const maxWidth = 40,
   maxHeight = 24;
// =================

const field = document.querySelector('.field');

class Player {
   constructor(name) {
      this.name = name;
   };

   state = {
      tile: 'tileP',
      maxHealth: 10,
      health: 10,
      attackPower: 1,
   }
};
const player = new Player('p-1');

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

for (let i = 0; i < maxWidth * maxHeight; i++) {
   const tile = document.createElement('div');

   // if (i == 0) {
   //    tile.className = 'tileP';
   //    field.append(tile);

   // } else if (i == 47 || i == 15 || i == 14 || i == 40) {
   //    tile.className = 'tileE';
   //    tile.id = `e-${i}`;
   //    field.append(tile);

   // } else if (i == 2) {
   //    tile.className = 'tileHP';
   //    field.append(tile);

   // } else if (i == 1) {
   //    tile.className = 'tileSW';
   //    field.append(tile);
   // }
   // else {
   //    tile.className = 'tile';
   //    field.append(tile);
   // }

   tile.className = 'tileW';
   field.append(tile);
}


const arrayField = [...field.children]; // == Array.from()


// Cлучайное количество 5-10 tile с размерами 3-8 ДxШ
// Cлучайное количество 3-5 по каждому направлению вертикальных и горизонтальных проходов в 1 tile

const roomArray = [];
const roomCount = randomNum(5, 10);

for (let i = 1; i <= roomCount; i++) {
   roomArray.push({ h: randomNum(3, 8), w: randomNum(3, 8) });
}
console.log(roomArray);


let startCount = randomNum(0, 160);
console.log(startCount);

function roomRender() {
   roomArray.forEach(item => {

      roomDrow(item, startCount);
      startCount = startCount + randomNum(item.w + 1, 120);
   });

}
roomRender();

function roomDrow(item, coord) {
   if ((coord + 1) % 40 == 0) {
      coord = coord + randomNum(1, 40);
   }
   for (let i = 0; i < (item.h * maxWidth); i = i + maxWidth) {
      for (let j = i; j < (i + item.w); j++) {
         arrayField[j + coord].className = 'tile';
      }
   }
};

// ===================
let arrayEnemy = [];
document.querySelectorAll('.tileE').forEach(item => {
   arrayEnemy.push(new Enemy(item.id));
});
// ===================

function randomNum(min, max) {
   const rand = min + Math.random() * (max + 1 - min);
   return Math.floor(rand);
}

function onEnemyMove(char) {
   const currentTile = char.currentTile();
   const side = randomNum(1, 4);
   let nextTile;

   // направо
   if (side == 1 && (currentTile == 0 || (currentTile + 1) % maxWidth != 0)) {
      nextTile = arrayField[currentTile + 1];
      setTileState(arrayField[currentTile], nextTile, char);
   }
   // налево
   if (side == 2 && (currentTile % maxWidth != 0)) {
      nextTile = arrayField[currentTile - 1];
      setTileState(arrayField[currentTile], nextTile, char);
   }
   // вниз
   if (side == 3 && (currentTile + maxWidth < arrayField.length)) {
      nextTile = arrayField[currentTile + maxWidth];
      setTileState(arrayField[currentTile], nextTile, char);
   }
   // вверх
   if (side == 4 && (currentTile - maxWidth >= 0)) {
      nextTile = arrayField[currentTile - maxWidth];
      setTileState(arrayField[currentTile], nextTile, char);
   }
}

function onPlayerMove(event) {
   const currentTile = arrayField.indexOf(document.querySelector('.tileP'));
   let nextTile;

   // направо
   if (event.code == 'KeyD' && (currentTile == 0 || (currentTile + 1) % maxWidth != 0)) {
      nextTile = arrayField[currentTile + 1];

      setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, player);
      enemyAction();
   }
   // налево
   if (event.code == 'KeyA' && (currentTile % maxWidth != 0)) {
      nextTile = arrayField[currentTile - 1];

      setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, player);
      enemyAction();
   }
   // вниз
   if (event.code == 'KeyS' && (currentTile + maxWidth < arrayField.length)) {
      nextTile = arrayField[currentTile + maxWidth];

      setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, player);
      enemyAction();
   }
   // вверх
   if (event.code == 'KeyW' && (currentTile - maxWidth >= 0)) {
      nextTile = arrayField[currentTile - maxWidth];

      setPlayerState(nextTile.className);
      setTileState(arrayField[currentTile], nextTile, player);
      enemyAction();
   }
   // атака
   if (event.code == 'Space') {
      event.preventDefault();
      setTileState(arrayField[currentTile], arrayField[currentTile], player);
      onAttack(currentTile, player);
      enemyAction();
   }
}
document.addEventListener('keydown', onPlayerMove);

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
   health.style.width = `${(char.state.health - 1) * 100 / char.state.maxHealth}%`;

   if (arrayField.indexOf(currentTile) == arrayField.indexOf(nextTile)) {
      currentTile.innerHTML = '';
      currentTile.className = 'tile';
      currentTile.removeAttribute('id');
      nextTile.className = char.state.tile;
      nextTile.id = char.name;
      nextTile.append(health);
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
   arrayEnemy.forEach(char => {
      if (char.state.health > 0) {
         let attackArea = getAttackArea(char.currentTile());
         let attack = false;
         attackArea.forEach(item => {
            if (item.classList.contains('tileP')) {
               attack = true;
            }
         });

         if (attack) {
            onAttack(char.currentTile(), char);
         } else {
            onEnemyMove(char);
         }
      }
   });
}

function getAttackArea(currentTile) {
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
   return attackArea;
}

function onAttack(currentTile, char) {
   const attackArea = getAttackArea(currentTile);

   if (char.state.tile == 'tileP') {
      attackArea.forEach(item => {
         if (item.classList.contains('tileE')) {
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
   } else {
      setTileState(char.enemyTile(), char.enemyTile(), char);

      attackArea.forEach(item => {
         if (item.classList.contains('tileP')) {
            player.state.health = player.state.health - 1;
         }
      });

      if (player.state.health == 0) {
         document.removeEventListener('keydown', onPlayerMove);
         document.querySelector('body h1').innerHTML = 'game over';
      }
   }
}

console.log(player);