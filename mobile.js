const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');

// Левая кнопка
leftBtn.addEventListener("touchstart", e => { e.preventDefault(); keys["ArrowLeft"] = true; });
leftBtn.addEventListener("touchend", e => { e.preventDefault(); keys["ArrowLeft"] = false; });
leftBtn.addEventListener("mousedown", e => { e.preventDefault(); keys["ArrowLeft"] = true; });
leftBtn.addEventListener("mouseup", e => { e.preventDefault(); keys["ArrowLeft"] = false; });
leftBtn.addEventListener("mouseleave", e => { keys["ArrowLeft"] = false; });

// Правая кнопка
rightBtn.addEventListener("touchstart", e => { e.preventDefault(); keys["ArrowRight"] = true; });
rightBtn.addEventListener("touchend", e => { e.preventDefault(); keys["ArrowRight"] = false; });
rightBtn.addEventListener("mousedown", e => { e.preventDefault(); keys["ArrowRight"] = true; });
rightBtn.addEventListener("mouseup", e => { e.preventDefault(); keys["ArrowRight"] = false; });
rightBtn.addEventListener("mouseleave", e => { keys["ArrowRight"] = false; });

