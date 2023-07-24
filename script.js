const rows = 4;
const column = 4;
const playzone = document.getElementById("playzone");
let r, c;

let board = [
    [8, 2, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

function PaintBoard() {
    for (r = 0; r < rows; r++) {
        for (c = 0; c < column; c++) {
            let tile = document.createElement('div');
            tile.classList.add('tile');
            let num = board[r][c];
            updatetile(tile, num);
        }
    }
}

PaintBoard();

function Repaint() {
    playzone.innerHTML = "";
    PaintBoard();
}


function updatetile(tile, num) {
    switch (num) {
        case 0:
            playzone.append(tile);
            break;
        case 2:
            tile.classList.add("x2");
            tile.innerText = "2";
            playzone.append(tile);
            break;
        case 4:
            tile.classList.add("x4");
            tile.innerText = "4";
            playzone.append(tile);
            break;
        case 8:
            tile.classList.add("x8");
            tile.innerText = "8";
            playzone.append(tile);
            break;
        case 16:
            tile.classList.add("x16");
            tile.innerText = "16";
            playzone.append(tile);
            break;
        case 32:
            tile.classList.add("x32");
            tile.innerText = "32";
            playzone.append(tile);
            break;
        case 64:
            tile.classList.add("x64");
            tile.innerText = "64";
            playzone.append(tile);
            break;
        case 128:
            tile.classList.add("x128");
            tile.innerText = "128";
            playzone.append(tile);
            break;
        case 256:
            tile.classList.add("x256");
            tile.innerText = "256";
            playzone.append(tile);
            break;
        case 512:
            tile.classList.add("x512");
            tile.innerText = "512";
            playzone.append(tile);
            break;
        case 1024:
            tile.classList.add("x1024");
            tile.innerText = "1024";
            playzone.append(tile);
            break;
        case 2048:
            tile.classList.add("x2048");
            tile.innerText = "2048";
            playzone.append(tile);
            break;
        case 4096:
            tile.classList.add("x4096");
            tile.innerText = "4096";
            playzone.append(tile);
            break;
        default:
            tile.classList.add('x8192');
            tile.innerText = "8192";
            playzone.append(tile);
    }
}

// we will do all the calculations mathematically and doing the hevy lifting of changing dom only once
// hence even with so many n² calculations our performance is not degrading as the size of input is very small and it will not increase 

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            // change the array 
            changeUp();
            // and then repaint;
            Repaint();
            break;
        case 'ArrowDown':
            changeDown();
            Repaint();
            break;
        case 'ArrowLeft':
            changeLeft();
            Repaint();
            break;
        case 'ArrowRight':
            changeRight();
            Repaint();
            break;

        default:
            break;
    }
})

function changeUp() {
    for (r = 1; r < rows; r++) {
        for (c = 0; c < column; c++) {
            let num = board[r][c];
            // if not an empty tile then do some action
            if (num != 0) {
                // if above has the same value then do this 
                if (num == board[r - 1][c]) {
                    board[r - 1][c] *= 2;
                    board[r][c] = 0;
                }
                // if there is empty space above
                if (board[r - 1][c] == 0) {
                    board[r - 1][c] = board[r][c];
                    board[r][c] = 0;
                }
                // else dont make any changes  
            }
        }
    }
}

function changeDown() {
    for (r = 2; r >= 0; r--) {
        for (c = 0; c < column; c++) {
            let num = board[r][c];
            // if not an empty tile then do some action
            if (num != 0) {
                // if down has the same value then do this 
                if (num == board[r + 1][c]) {
                    board[r + 1][c] *= 2;
                    board[r][c] = 0;
                }
                // if there is empty space above
                if (board[r + 1][c] == 0) {
                    board[r + 1][c] = board[r][c];
                    board[r][c] = 0;
                }
                // else dont make any changes
            }
        }
    }
}
function changeLeft() {
    for (c = 1; c < column; c++) {
        for (r = 0; r < rows; r++) {
            let num = board[r][c];
            // if not an empty tile then do some action
            if (num != 0) {
                // if left has the same value then do this 
                if (num == board[r][c - 1]) {
                    board[r][c - 1] *= 2;
                    board[r][c] = 0;
                }
                // if there is empty space above
                if (board[r][c - 1] == 0) {
                    board[r][c - 1] = board[r][c];
                    board[r][c] = 0;
                }
                // else dont make any changes
            }
        }
    }
}
function changeRight() {
    for (c = 2; c >= 0; c--) {
        for (r = 0; r < rows; r++) {
            let num = board[r][c];
            // if not an empty tile then do some action
            if (num != 0) {
                // if right has the same value then do this 
                if (num == board[r][c + 1]) {
                    board[r][c + 1] *= 2;
                    board[r][c] = 0;
                }
                // if there is empty space ahead
                let i=1;
                while(c+i<column){
                    if(board[r][c+i]==0){
                        board[r][c+i]=board[r][c+i-1];
                        board[r][c+i-1]=0;
                    }
                    if(board[r][c+i]==board[r][c+i-1]){
                        board[r][c+i]*=2;
                        board[r][c+i-1]=0;
                    }
                    i++;
                }
                // else dont make any changes
            }
        }
    }
}

// generate random nos at places
// generate only 2s and only generate 4s it the score goes above some threshold
// make mobile working as well
// add local storage