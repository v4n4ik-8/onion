window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 320;
canvas.height = 240;

canvas.style.width = 320 * Math.round(window.innerWidth / 320) + 'px';
canvas.style.height = 240 * Math.round(window.innerHeight/240) + 'px';

ctx.imageSmoothingEnabled = false;

const scale = 1;
const frameWidth = 19;
const frameHeight = 38;
const gap = 0;              // если нет промежутков между кадрами
let totalFrames = 4;
let currentFrame = 0;
let frameTimer = 0;
const frameInterval = 10;

let playerX = canvas.width / 2 - (frameWidth * scale) / 2;
let playerY = canvas.height - frameHeight * scale - 20;

let keys = {};

document.addEventListener("keydown", e => {
    keys[e.code] = true;
});

document.addEventListener("keyup", e => {
    keys[e.code] = false;
});

// Загружаем спрайты персонажа один раз
const spriteDown = new Image();
spriteDown.src = "spr_yasya_down_1.png";

const spriteLeft = new Image();
spriteLeft.src = "spr_yasya_left.png";

const spriteRight = new Image();
spriteRight.src = "spr_yasya_right.png";

// Текущий спрайт
let currentSprite = spriteDown;

// Ждём загрузки всех картинок перед запуском
let imagesLoaded = 0;
const totalImages = 3;

function onImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        requestAnimationFrame(gameLoop);
    }
}

spriteDown.onload = onImageLoad;
spriteLeft.onload = onImageLoad;
spriteRight.onload = onImageLoad;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawHP()

    // Обновляем позицию и спрайт
    if (keys["ArrowLeft"]) {
        playerX -= 2;
        currentSprite = spriteLeft;
    } else if (keys["ArrowRight"]) {
        playerX += 2;
        currentSprite = spriteRight;
    } else {
        currentSprite = spriteDown;
        currentFrame = 0;  // можно сбросить анимацию, если хочешь
    }

    // Ограничиваем в пределах экрана
    if (playerX < 0) playerX = 0;
    if (playerX > canvas.width - frameWidth * scale) playerX = canvas.width - frameWidth * scale;

    // Обновляем анимацию кадров
    frameTimer++;
    if (currentSprite === spriteDown) {
          totalFrames = 1;
    } else {
          totalFrames = 4;
    }
    if (frameTimer >= frameInterval) {
        currentFrame = (currentFrame + 1) % totalFrames;
        frameTimer = 0;
    }

    const playerRect = {
      x: playerX,
      y: playerY,
      width: frameWidth * scale,
      height: frameHeight * scale,
    };

    if (!isGameOver) {
      updateAndDrawOnions();
      checkCollision(playerRect, onions);
    } else {
      ctx.fillStyle = "red";
      ctx.font = "30px Arial";
      ctx.fillText("GAME OVER", canvas.width / 2 - 80, canvas.height / 2);
    }

    // Рисуем игрока (после обновления)
    const sx = currentFrame * (frameWidth + gap);
    const sy = 0;

    ctx.drawImage(
        currentSprite,
        sx, sy, frameWidth, frameHeight,
        playerX, playerY, frameWidth * scale, frameHeight * scale
    );

    requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
  // Определяем ширину и высоту экрана с учётом ориентации
  const isLandscape = window.innerWidth > window.innerHeight;

  // Для альбомной ориентации: кратно 320 по ширине, 240 по высоте
  let targetWidth = isLandscape
    ? 320 * Math.floor(window.innerWidth / 320)
    : 240 * Math.floor(window.innerWidth / 240);

  let targetHeight = isLandscape
    ? 240 * Math.floor(window.innerHeight / 240)
    : 320 * Math.floor(window.innerHeight / 320);

  // На всякий случай ограничиваем минимальные размеры
  targetWidth = Math.max(targetWidth, 320);
  targetHeight = Math.max(targetHeight, 240);

  canvas.style.width = targetWidth + 'px';
  canvas.style.height = targetHeight + 'px';
}
