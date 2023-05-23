document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById("player");
  const gameContainer = document.getElementById("game-container");

  let playerX = gameContainer.offsetWidth / 2 - player.offsetWidth / 2;
  let createdFallingElements = 0;
  let timeoutToFall = 400
  

  document.addEventListener("keydown", (event) => {
      if (event.code === "ArrowLeft") {
          playerX -= 25;
      } else if (event.code === "ArrowRight") {
          playerX += 25;
      }

      // Ограничение движения игрока в пределах контейнера
      if (playerX < 0) {
          playerX = 0;
      } else if (playerX > gameContainer.offsetWidth - player.offsetWidth) {
          playerX = gameContainer.offsetWidth - player.offsetWidth;
      }

      player.style.left = playerX + "px";
  });

  document.addEventListener("touchstart", (event) => {
    const touchX = event.touches[0].clientX; // Получение координаты X касания
    const screenWidth = window.innerWidth; // Получение ширины экрана

    if (touchX < screenWidth / 2) {
      playerX -= 25; // Движение влево
    } else {
      playerX += 25; // Движение вправо
    }
    if (playerX < 0) {
      playerX = 0;
    } else if (playerX > gameContainer.offsetWidth - player.offsetWidth) {
      playerX = gameContainer.offsetWidth - player.offsetWidth;
    }
    // Обновление позиции игрока
    player.style.left = `${playerX}px`;
  });

  function createFallingObject() {
    createdFallingElements++;
      console.log(timeoutToFall); 
      const object = document.createElement("div");
      object.className = "falling-object";

      const randomX = Math.floor(Math.random() * (gameContainer.offsetWidth - 20));
      object.style.left = randomX + "px";
      object.style.top = "0px";

      gameContainer.appendChild(object);

      const fallingObjectInterval = setInterval(() => {
          const objectTop = object.offsetTop;
          const objectBottom = object.offsetTop + object.offsetHeight;
          const objectLeft = object.offsetLeft;
          const objectRight = object.offsetLeft + object.offsetWidth;

          const playerTop = player.offsetTop;
          const playerBottom = player.offsetTop + player.offsetHeight;
          const playerLeft = player.offsetLeft;
          const playerRight = player.offsetLeft + player.offsetWidth;

          if (
              ((playerTop <= objectTop && objectTop <= playerBottom) ||
              (playerTop <= objectBottom && objectBottom <= playerBottom)) &&
              (playerLeft <= objectRight && objectRight <= playerRight ||
              playerLeft <= objectLeft && objectLeft <= playerRight)
          ) {
              clearInterval(fallingObjectInterval);
              alert("Простоял: " + createdFallingElements + " квадратов");
              location.reload();
          }

          if (object.offsetTop >= gameContainer.offsetHeight) {
              clearInterval(fallingObjectInterval);
              gameContainer.removeChild(object);
          } else {
              object.style.top = object.offsetTop + 10 + "px";
          }
      }, 50);
      if (createdFallingElements % 10 ==0) {
        
        timeoutToFall = Math.round(timeoutToFall * 0.9);
      }
    // here we change amount of falling objects
      setTimeout(createFallingObject, timeoutToFall);
  }

  createFallingObject();
});
