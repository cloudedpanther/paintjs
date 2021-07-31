const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.controls__color');
const range = document.querySelector('.controls__range .range');
const mode = document.querySelector('.mode');
const saveBtn = document.querySelector('.save');

const INITIAL_COLOR = '#2c2c2c';

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5;

let painting = false;
let filling = false;

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
        console.log(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleMouseDown(event) {
    const mouseWhich = event.which;
    // left mouse button down
    if(mouseWhich === 1) {
        startPainting();
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
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const brushSize = event.target.value;
    ctx.lineWidth = brushSize;
}

function handleModeToggle() {
    if(filling) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
    }
    
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextMenu(event) {
    event.preventDefault();
}

function handleSaveBtnClick() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "paintjs_export";
    link.click();
}

function init() {
    if(canvas) {
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseenter", handleMouseEnter);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleContextMenu);
    }

    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

    if(range) {
        range.addEventListener("input", handleRangeChange);
    }

    if(mode) {
        mode.addEventListener("click", handleModeToggle);
    }

    if(saveBtn) {
        saveBtn.addEventListener("click", handleSaveBtnClick);
    }
}

init();