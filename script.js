// UI references
const canvas = document.querySelector(".canvas");
const rangeInputGrid = document.querySelector("#grid-dimension");
const spanGrid = document.querySelector("span");
const btnGrid = document.querySelector("#btn-grid-dimension")

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
    paintBlackTile(event);
});

canvas.addEventListener("mouseover", (event) => {
    if(isPainting) {
        paintBlackTile(event);
    }
});

canvas.addEventListener("mouseup", () => {
    isPainting = false;
})

function paintBlackTile(event) {
    let target = event.target;
    if(target.style.opacity < 1) {
        target.style.backgroundColor = "black";
        event.target.style.opacity = +target.style.opacity + 0.1;
    }
}

createNewGrid();