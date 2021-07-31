const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.controls__color');
const range = document.querySelector('.controls__range .range');

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 5;

let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function handleMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleMouseEnter(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.moveTo(x, y);
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}

function init() {
    if(canvas) {
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        document.addEventListener("mouseup", stopPainting);
        // canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("mouseenter", handleMouseEnter);
    }

    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

    if(range) {
        range.addEventListener("input", handleRangeChange);
    }
}

init();