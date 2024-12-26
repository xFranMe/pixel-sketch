const canvas = document.querySelector(".canvas");
const rangeInputGrid = document.querySelector("#grid-dimension");
const spanGrid = document.querySelector("span");
const btnGrid = document.querySelector("#btn-grid-dimension")

rangeInputGrid.addEventListener("input", () => {
    spanGrid.textContent = rangeInputGrid.value; 
});

btnGrid.addEventListener("click", createGrid);

function createGrid() {
    canvas.replaceChildren();

    let gridTotalTiles = rangeInputGrid.value * rangeInputGrid.value;

    for(let i = 0; i < gridTotalTiles; i++) {
        let square = document.createElement("div");
        square.style.width = `${100 / rangeInputGrid.value}%`;
        square.classList.add("tile");
        canvas.appendChild(square);
    }
}

createGrid();





canvas.addEventListener("mouseover", (event) => {
    event.target.style.backgroundColor = "black";
    event.target.style.opacity = `${+event.target.style.opacity + 0.1}`;
    console.log(event.target.style.opacity);
});


