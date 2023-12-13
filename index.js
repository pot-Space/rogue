'use strict';
const maxWidth = 40,
   maxHeight = 24;

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

(function mapGenerating() {
   for (let i = 0; i < maxWidth * maxHeight; i++) {
      const tile = document.createElement('div');
      tile.className = 'tileW';
      field.append(tile);
   }
}())

const arrayField = [...field.children]; // == Array.from()

// Generating rooms
function roomsGenerating() {
   const roomArray = [];
   const roomCount = randomNum(5, 10);

   for (let i = 1; i <= roomCount; i++) {
      roomArray.push({ h: randomNum(3, 8), w: randomNum(3, 8) });
   }

   let startCount = randomNum(0, 160);
   roomArray.forEach(item => {
      roomRender(item, startCount);
      startCount = startCount + randomNum(item.w + 1, 120);
   });

   function roomRender(item, coord) {
      for (let i = 1; i <= 8; i++) {
         let nextTempTile = coord + i;
         if (nextTempTile % maxWidth == 0) {
            coord = nextTempTile;
         }
      }

      for (let i = 0; i < (item.h * maxWidth); i = i + maxWidth) {
         for (let j = i; j < (i + item.w); j++) {
            if ((j + coord) >= (maxWidth * maxHeight)) {
               coord = maxWidth * maxHeight - maxWidth * item.h;

               for (let k = 1; k <= 8; k++) {
                  let nextTempTile = coord + k;
                  if (nextTempTile % maxWidth == 0) {
                     coord = nextTempTile;
                  }
               }
            } else {
               arrayField[j + coord].className = 'tile';
            }
         }
      }
   }
   corridorsGenerating();
}
roomsGenerating();

// Generating corridors
function corridorsGenerating() {
   let corridorArray = [];
   let corridorCount = randomNum(3, 5);
   for (let i = 1; i <= corridorCount; i++) {
      if (corridorCount == 3) {
         corridorArray.push(i * Math.floor((maxHeight - 2) / 3) * maxWidth);
      }
      if (corridorCount == 4) {
         corridorArray.push(i * Math.floor((maxHeight - 2) / 4) * maxWidth);
      }
      if (corridorCount == 5) {
         corridorArray.push(i * Math.floor((maxHeight - 2) / 5) * maxWidth);
      }
   }
   corridorArray.forEach(item => {
      for (let i = item; i < (item + maxWidth); i++) {
         arrayField[i].className = 'tile';
      }
   });


   corridorArray = [];
   corridorCount = randomNum(3, 5);
   for (let i = 1; i <= corridorCount; i++) {
      if (corridorCount == 3) {
         corridorArray.push(i * Math.floor((maxWidth - 2) / 3));
      }
      if (corridorCount == 4) {
         corridorArray.push(i * Math.floor((maxWidth - 2) / 4));
      }
      if (corridorCount == 5) {
         corridorArray.push(i * Math.floor((maxWidth - 2) / 5));
      }
   }
   corridorArray.forEach(item => {
      for (let i = item; i < (maxWidth * maxHeight); i = i + maxWidth) {
         arrayField[i].className = 'tile';
      }
   });
}

// Adding enemies, player, items
function getArrayFreeTile(array) {
   return array.filter(item => item.classList.contains('tile'));
}
(function locate() {
   // add player
   getArrayFreeTile(arrayField)[randomNum(0, getArrayFreeTile(arrayField).length - 1)].className = 'tileP';
   document.querySelector('.tileP').id = player.name;
   // add swords
   for (let i = 0; i < 2; i++) {
      getArrayFreeTile(arrayField)[randomNum(0, getArrayFreeTile(arrayField).length - 1)].className = 'tileSW';
   };
   // add potions
   for (let i = 0; i < 10; i++) {
      getArrayFreeTile(arrayField)[randomNum(0, getArrayFreeTile(arrayField).length - 1)].className = 'tileHP';
   };
   // add enemies
   for (let i = 0; i < 10; i++) {
      const targetTile = randomNum(0, getArrayFreeTile(arrayField).length - 1),
         targetArrey = getArrayFreeTile(arrayField)[targetTile];

      targetArrey.className = 'tileE';
      targetArrey.id = `e-${i}`;
   };
}())

// Arrey of enemies
const arrayEnemy = [];
document.querySelectorAll('.tileE').forEach(item => {
   arrayEnemy.push(new Enemy(item.id));
});

// Randomizer
function randomNum(min, max) {
   const rand = min + Math.random() * (max + 1 - min);
   return Math.floor(rand);
}

// Enemies movement
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

// Player movement
function onPlayerMove(event) {
   const currentTile = arrayField.indexOf(document.querySelector('.tileP'));
   let nextTile;

   new Audio('sound/step.mp3').play();

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
      document.querySelector('.end').style.display = 'none';


      if (randomNum(0, 1) == 1) {
         new Audio('sound/attack_01.mp3').play();
      } else {
         new Audio('sound/attack_02.mp3').play();
      }

      setTileState(arrayField[currentTile], arrayField[currentTile], player);
      onAttack(currentTile, player);
      enemyAction();
   }
}
document.addEventListener('keydown', onPlayerMove);

// Setting player status
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

// Tile setting
function setTileState(currentTile, nextTile, char) {
   const health = document.createElement('div');
   health.className = 'health';
   health.style.width = `${(char.state.health) * 100 / char.state.maxHealth}%`;

   if (arrayField.indexOf(currentTile) == arrayField.indexOf(nextTile)) {
      currentTile.innerHTML = '';
      currentTile.className = 'tile';
      currentTile.removeAttribute('id');
      nextTile.className = char.state.tile;
      nextTile.id = char.name;
      nextTile.append(health);
   }

   if (!nextTile.classList.contains('tile')) {
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

// Enemies action
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

// Area of attack
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

// Player or enemies attack
function onAttack(currentTile, char) {
   const attackArea = getAttackArea(currentTile);

   if (char.state.tile == 'tileP') {
      attackArea.forEach(item => {
         if (item.classList.contains('tileE')) {
            for (let i = 0; i < arrayEnemy.length; i++) {
               if (item.id == arrayEnemy[i].name) {
                  arrayEnemy[i].state.health = arrayEnemy[i].state.health - char.state.attackPower;

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
         document.querySelector('.tileP>.health').style.width = '0%';
         document.removeEventListener('keydown', onPlayerMove);
         document.querySelector('.end>h2').innerHTML = 'Игра окончена';
         document.querySelector('.end').style.display = 'flex';
      }
   }
}


console.log(player);