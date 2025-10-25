function render(state) {
    document.querySelector("#grid")?.remove();

    const mainEl = document.querySelector("main");
    const gridEl = document.createElement("section")
    gridEl.id = "grid";

    const numberOfRows = state.length;
    const numberOfCols = state[0].length;

    for (let r = 0; r < numberOfRows; r++) {
        const rowEl = document.createElement("div");
        rowEl.className = "row";

        for (let c = 0; c < numberOfCols; c++) {
            const colEl = document.createElement("div");
            colEl.classList.add("cell");
            if (state[r][c] === 1) {
                colEl.classList.add("alive");
            }

            rowEl.appendChild(colEl);
        }

        gridEl.appendChild(rowEl);
    }

    mainEl.appendChild(gridEl);
}

function evolve(state) {
    const result = [];

    const numberOfRows = state.length;
    const numberOfCols = state[0].length;

    for (let r = 0; r < numberOfRows; r++) {
        const newRow = [];
        for (let c = 0; c < numberOfCols; c++) {
            newRow.push(calculateNewCellValue(state, r, c));
        }

        result.push(newRow);
    }

    return result;
}

function calculateNewCellValue(state, r, c) {

    const numberOfRows = state.length;
    const numberOfCols = state[0].length;


    let liveNeighbors = 0;

    for (nr = r - 1; nr <= r + 1; nr++) {
        if (nr < 0 || nr >= numberOfRows) continue;

        for (nc = c - 1; nc <= c + 1; nc++) {
            if (nc < 0 || nc >= numberOfCols) continue;
            if (nr === r && nc === c) continue;

            if (state[nr][nc] === 1) liveNeighbors++;
        }
    }

    if (state[r][c] === 1) {
        if(liveNeighbors < 2) return 0;
        if(liveNeighbors > 3) return 0;
        else return 1;
    }
    else {
        if(liveNeighbors === 3) return 1;
        else return 0;
    }
}

let state = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,0,1,1,0,1,1,1,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,0,0,0,0],
    [1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

function mainLoop() {
    render(state);
    state = evolve(state)
}

setInterval(mainLoop, 400);