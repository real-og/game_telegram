function preventDoubleTapZoom() {
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
}

preventDoubleTapZoom();

document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById("player");
  const gameContainer = document.getElementById("game-container");

  let playerX = gameContainer.offsetWidth / 2 - player.offsetWidth / 2;
  let createdFallingElements = 0;
  let score = 0;
  let timeoutToFall = 400;
  let level = 1;
  let isGameOver = false;
  let collidedElements = [];
  

function handleKeyDown(event) {
  if (isGameOver) {
    return; // Если игра завершена, выходим из функции
  }
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
}

function handleTouch(event) {
  if (isGameOver) {
    return; // Если игра завершена, выходим из функции
  }
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
}



function gameOver() {
  console.log('game over');
  isGameOver = true;

  // Показываем окно проигрыша
  const gameOverOverlay = document.getElementById("game-over-overlay");
  gameOverOverlay.style.display = "flex";

  // Выводим счет игрока
  const scoreText = document.getElementById("game-over-score");
  scoreText.textContent = score;

  // Обработчик для кнопки "Играть снова"
  const playAgainButton = document.getElementById("play-again-button");
  playAgainButton.addEventListener("click", resetGame);
}


// Функция для сброса игры
function resetGame() {
    console.log('reset game');
    createdFallingElements = 0;
    timeoutToFall = 400;
    level = 1;
    isGameOver = false;
    score = 0;

    collidedElements.forEach(function(element) {
      element.remove(); // или element.parentNode.removeChild(element);
    });
    collidedElements = [];

    const gameOverOverlay = document.getElementById("game-over-overlay");
    gameOverOverlay.style.display = "none";
    createFallingObject();
    // location.reload()
}





  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("touchstart", handleTouch);



  function createFallingObject() {
    if (isGameOver) {
      return; // Если игра завершена, выходим из функции
    }
    createdFallingElements++;
    score++;
      // console.log(timeoutToFall); 
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
              collidedElements.push(object);
              gameOver();
              // alert("Простоял: " + score + " квадратов");
              // location.reload();
          }

          if (object.offsetTop >= gameContainer.offsetHeight) {
              clearInterval(fallingObjectInterval);
              gameContainer.removeChild(object);
          } else {
              object.style.top = object.offsetTop + 10 + "px";
          }
      }, 50);
      if (createdFallingElements % (level * 7) == 0) {
        level += 1;
        createdFallingElements = 0;
        console.log(level); 
        timeoutToFall = Math.round(timeoutToFall * 0.9);
      }
    
      const scoreElement = document.getElementById("score");
        scoreElement.textContent = score;
      const levelElement = document.getElementById("level");
        levelElement.textContent = level;
      setTimeout(createFallingObject, timeoutToFall);
  }

  createFallingObject();
});
