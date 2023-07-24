const rows = 4;
const column = 4;
const playzone = document.getElementById("playzone");
let r, c;

let board = [
    [0, 16, 8, 4],
    [0, 4, 0, 0],
    [0, 2, 2, 0],
    [32, 8, 0, 2]
]
// jab top right me alag alag ho to left not working

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
    for (r = 0; r < rows; r++) {
        // selecting a row
        let array = board[r];
        let arrayWithouZeros=array.filter(num=>num!==0);
        // if it has some elems then do something 
        if(arrayWithouZeros.length){
            if(arrayWithouZeros.length==1){
                // replacing the original array by pushing to right 
                array[0]=arrayWithouZeros[0];
                for(let i=1;i<4;i++){
                    array[i]=0;
                }
            }
            else if(arrayWithouZeros.length==2){
                // if both elems are same 
                if(arrayWithouZeros[0]===arrayWithouZeros[1]){
                    arrayWithouZeros[0]*=2;
                    array[0]=arrayWithouZeros[0];
                    for(let i=1;i<4;i++){
                        array[i]=0;
                    }
                }
                else{
                    array[0]=arrayWithouZeros[0];
                    array[1]=arrayWithouZeros[1];
                    for(let i=2;i<4;i++){
                        array[i]=0;
                    }
                }
            }

            else if(arrayWithouZeros.length==3){
                let i=0;
                while(i<2){
                    if(arrayWithouZeros[i]===arrayWithouZeros[i+1]){
                        arrayWithouZeros[i]*=2;
                        arrayWithouZeros[i+1]=0;
                        i+=2;
                    }
                    else{
                        i++;
                    }
                }
                arrayWithouZeros = arrayWithouZeros.filter(n=>n!==0);

                // replacing the original array
                let k=0;
                for(let j=0;j<arrayWithouZeros.length;j++){
                    array[j]=arrayWithouZeros[k];
                    k++;
                }
                for(let j=arrayWithouZeros.length;j<4;j++){
                    array[j]=0;
                }
            }

            else if(arrayWithouZeros.length==4){
                let i=0;
                while(i<3){
                    if(arrayWithouZeros[i]===arrayWithouZeros[i+1]){
                        arrayWithouZeros[i]*=2;
                        arrayWithouZeros[i+1]=0;
                        i+=2;
                    }
                    else{
                        i++;
                    }
                }
                arrayWithouZeros = arrayWithouZeros.filter(n=>n!==0);

                // replacing the original array
                let k=0;
                for(let j=0;j<arrayWithouZeros.length;j++){
                    array[j]=arrayWithouZeros[k];
                    k++;
                }
                for(let j=arrayWithouZeros.length;j<4;j++){
                    array[j]=0;
                }
            }
        }
    
    }
}

function changeRight() {
        for (r = 0; r < rows; r++) {
            let array = board[r];
            let arrayWithouZeros=array.filter(num=>num!==0);
            // if it has some elems then do something 
            if(arrayWithouZeros.length){
                if(arrayWithouZeros.length==1){
                    // replacing the original array by pushing to right 
                    array[3]=arrayWithouZeros[0];
                    for(let i=0;i<3;i++){
                        array[i]=0;
                    }
                }
                else if(arrayWithouZeros.length==2){
                    // if both elems are same 
                    if(arrayWithouZeros[0]===arrayWithouZeros[1]){
                        arrayWithouZeros[1]*=2;
                        array[3]=arrayWithouZeros[1];
                        for(let i=0;i<3;i++){
                            array[i]=0;
                        }
                    }
                    else{
                        for(let i=0;i<2;i++){
                            array[i]=0;
                        }
                        array[2]=arrayWithouZeros[0];
                        array[3]=arrayWithouZeros[1];
                    }
                }
                else if(arrayWithouZeros.length==3){
                    let i=2;
                    while(i>0){
                        if(arrayWithouZeros[i]===arrayWithouZeros[i-1]){
                            arrayWithouZeros[i]*=2;
                            arrayWithouZeros[i-1]=0;
                            i-=2;
                        }
                        else{
                            i--;
                        }
                    }
                    arrayWithouZeros = arrayWithouZeros.filter(n=>n!==0);

                    // replacing the original array
                    for(let j=0;j<4-arrayWithouZeros.length;j++)
                        array[j]=0;
                    let k=0;                        
                    for(let j=4-arrayWithouZeros.length;j<4;j++){
                        array[j]=arrayWithouZeros[k];
                        k++;
                    }
                }

                else if(arrayWithouZeros.length==4){
                    let i=3;
                    while(i>0){
                        if(arrayWithouZeros[i]===arrayWithouZeros[i-1]){
                            arrayWithouZeros[i]*=2;
                            arrayWithouZeros[i-1]=0;
                            i-=2;
                        }
                        else{
                            i--;
                        }
                    }
                    arrayWithouZeros = arrayWithouZeros.filter(n=>n!==0);

                    // replacing the original array
                    for(let j=0;j<4-arrayWithouZeros.length;j++)
                        array[j]=0;
                    let k=0;                        
                    for(let j=4-arrayWithouZeros.length;j<4;j++){
                        array[j]=arrayWithouZeros[k];
                        k++;
                    }
                }
            }
        
        }
}






// generate random nos at places
// generate only 2s and only generate 4s it the score goes above some threshold
// make mobile working as well
// add local storage