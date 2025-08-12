let onions = [];

const onion = new Image();
onion.src = "onion.png";

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function spawnOnion() {
    if (onions.length < 5) {
        let width = randomRange(25, 50);
        let height = randomRange(25, 50);
        onions.push({
            x: randomRange(0, canvas.width - width),
            y: -height,
            width: width,
            height: height,
            speed: randomRange(1, 3),
        });
    }
}

function updateAndDrawOnions() {
    spawnOnion(); // Важно: скобки, чтобы вызвать функцию

    for (let i = onions.length - 1; i >= 0; i--) {
        let o = onions[i];
        o.y += o.speed;

        ctx.drawImage(onion, o.x, o.y, o.width, o.height);

        if (o.y > canvas.height) {
            onions.splice(i, 1);
        }
    }
}