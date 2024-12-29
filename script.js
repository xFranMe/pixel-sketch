// UI references
const canvas = document.querySelector(".canvas");
const rangeInputGrid = document.querySelector("#grid-dimension");
const spanGrid = document.querySelector("span");
const btnGrid = document.querySelector("#btn-grid-dimension");
const modes = document.querySelectorAll("input[name = 'mode']");
const selectedColor = document.querySelector("#selected-color");
const colorOption = document.querySelector("#color-option");
const erase = document.querySelector("#eraser");
let selectedMode = null;


modes.forEach(mode => {
    if(mode.checked) {
        selectedMode = mode.value;
    }

    mode.addEventListener("change", () => {
        let result = confirm("Do you want to switch mode? Your progress will be lost.");
        if(result) { 
            selectedMode = mode.value;
            createNewGrid();
            if(selectedMode !== "pixel-art") {
                colorOption.style.display = "none";
            } else {
                colorOption.style.display = "block";
            }
        }
        else { 
            modes.forEach(mode => {
                if(mode.value === selectedMode) {
                    mode.checked = true;
                }
            });
        }
    });
});

rangeInputGrid.addEventListener("input", () => {
    spanGrid.textContent = rangeInputGrid.value; 
});

btnGrid.addEventListener("click", createNewGrid);

function createNewGrid() {
    canvas.replaceChildren();

    const gridTotalTiles = rangeInputGrid.value * rangeInputGrid.value;

    for(let i = 0; i < gridTotalTiles; i++) {
        let tile = document.createElement("div");
        tile.style.width = `${100 / rangeInputGrid.value}%`;
        tile.classList.add("tile");
        canvas.appendChild(tile);
    }
}

let isPainting = false;

canvas.addEventListener("mousedown", (event) => {
    event.preventDefault();
    isPainting = true;
    if(erase.checked) { eraseTile(event) }
    else {paintTile(event);}
});

canvas.addEventListener("mouseover", (event) => {
    if(isPainting) {
        if(erase.checked) { eraseTile(event) }
        else {paintTile(event);}
    }
});

canvas.addEventListener("mouseup", () => {
    isPainting = false;
})

function paintSketchTile(event) {
    let target = event.target;
    if(target.style.opacity < 1) {
        target.style.backgroundColor = "black";
        target.style.opacity = +target.style.opacity + 0.1;
    }
}

function paintPixelArtTile(event) {
    let target = event.target;
    target.style.backgroundColor = `${selectedColor.value}`;
}

function paintTile(event) {
    switch(selectedMode) {
        case "sketch":
            paintSketchTile(event);
            break;
        case "pixel-art":
            paintPixelArtTile(event);
            break;
        default:
    }
}

function eraseTile(event) {
    let target = event.target;
    target.style.removeProperty("background-color");
    if(target.style.opacity < 1) {target.style.opacity = '';}
}

// Download
const btnPicDownload = document.querySelector("#btn-pic-download");

btnPicDownload.addEventListener("click", () => {
    html2canvas(canvas).then(newCanvas => {
        const link = document.createElement("a");
        link.download = "my-drawing.png";
        link.href = newCanvas.toDataURL();
        link.click();
    });
});

createNewGrid();