'use strict';

const field = document.querySelector('.field');
const char = {
   health: 1,
   attackPower: 1,
}


for (let i = 1; i < 40 * 24; i++) {
   const tile = document.createElement('div');
   tile.className = 'tile';
   field.append(tile);
}


let arrField = [...field.children]; // == Array.from()


document.addEventListener('keydown', event => {
   const charTile = document.querySelector('.tileP');
   const currentPosition = arrField.indexOf(charTile);

   // направо
   if (event.code == 'KeyD' && (currentPosition == 0 || currentPosition % 39 != 0)) {
      const nextPosition = arrField[currentPosition + 1];

      setCharState(nextPosition.className);

      arrField[currentPosition].className = 'tile';
      nextPosition.className = 'tileP';
   }

   // налево
   if (event.code == 'KeyA' && (currentPosition % 40 != 0)) {
      const nextPosition = arrField[currentPosition - 1];

      setCharState(nextPosition.className);

      arrField[currentPosition].className = 'tile';
      nextPosition.className = 'tileP';

   }

   // вниз
   if (event.code == 'KeyS' && (currentPosition + 40 < arrField.length)) {
      const nextPosition = arrField[currentPosition + 40];

      setCharState(nextPosition.className);

      arrField[currentPosition].className = 'tile';
      nextPosition.className = 'tileP';

   }

   // вверх
   if (event.code == 'KeyW' && (currentPosition - 40 >= 0)) {
      const nextPosition = arrField[currentPosition - 40];

      setCharState(nextPosition.className);

      arrField[currentPosition].className = 'tile';
      nextPosition.className = 'tileP';
   }
});


function setCharState(classTile) {
   switch (classTile) {
      case 'tileHP':
         if (char.health < 5) {  // * фиксированный порог HP
            char.health = char.health + 1;
            changeHP();
         }
         console.log(char);
         break;

      case 'tileSW':
         char.attackPower = char.attackPower + 1;
         console.log(char);
         break;
   }
}

function changeHP() {
   let newHP = 120 / 5 * char.health;
   document.querySelector('.tileP').style.setProperty('--hp-current', newHP);
}



console.log(char);