let hp = 10;

let isGameOver = false;

function isColliding(a, b) {
  return !(
    a.x + a.width < b.x ||
    a.x > (b.x - 5) + (b.width - 5) ||
    a.y + a.height < b.y ||
    a.y > (b.y - 5) + (b.height - 5)
  );
}

function checkCollision(player, onions) {
    for (let i = onions.length - 1; i >= 0; i--) {
        if (isColliding(player, onions[i])) {
            hp--;
            onions.splice(i, 1);
            if (hp <= 0) {
                isGameOver = true;
            }
        }
    }
}

function drawHP() {
    const maxHP = 10; // Макс ХП, можно вынести в переменную
    const barWidth = 100; // Длина полоски в пикселях
    const barHeight = 15; // Высота полоски

    // Позиция полоски
    const x = 10;
    const y = 10;

    // Фон полоски (серый)
    ctx.fillStyle = "#555";
    ctx.fillRect(x, y, barWidth, barHeight);

    // Заполненная часть (красная)
    const hpWidth = (hp / maxHP) * barWidth;
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, hpWidth, barHeight);

    // Обводка
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, barWidth, barHeight);

    // Текст ХП сверху (по желанию)
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(`HP: ${hp} / ${maxHP}`, x + 5, y + barHeight - 3);
}
