const rows = 4;
const column = 4;
const playzone = document.getElementById("playzone");
const currScoreVal=document.getElementById("currScoreVal");
const bestScoreVal=document.getElementById("bestScoreVal");
let r, c;
let emptyBoxes=[]; 
let score=localStorage.getItem("currentScore")!==null?Number(JSON.parse(localStorage.getItem("currentScore"))):0;
currScoreVal.innerText=score;
let bestScore=localStorage.getItem("bestScore")!==null?Number(JSON.parse(localStorage.getItem("bestScore"))):0;
bestScoreVal.innerText=bestScore;

let flag=false;

const startBoard=[
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
let board =localStorage.getItem("board")!==null?JSON.parse(localStorage.getItem("board")):startBoard;

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
window.onload=()=>{
    selectEmptyBoxes();
    Repaint();
}

window.onbeforeunload=()=>{
    localStorage.setItem("currentScore",JSON.stringify(score));
    localStorage.setItem("bestScore",JSON.stringify(bestScore));
    localStorage.setItem("board",JSON.stringify(board));
}


function Repaint() {
    playzone.innerHTML = "";
    PaintBoard();
}

function RestartGame(){
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    score=0;
    currScoreVal.innerText=0;
    playzone.id="playzone"
    selectEmptyBoxes();
    Repaint();
}

function updatetile(tile, num) {
    if(num>0){
        tile.classList.add("x"+num.toString());
        tile.innerText=num;
    }
    playzone.append(tile);
}

function selectEmptyBoxes(){
    emptyBoxes=[];
    // updating empty boxes 
    for(c=0;c<column;c++){
        for(r=0;r<rows;r++){
            if(board[r][c]===0){
                emptyBoxes.push(r*10+c);
            }
        }
    }
    // if no empty box then end the game
    if(emptyBoxes.length===0){
        playzone.id="playzoneInRestart";
        playzone.innerHTML=`
        <h1 id="gmOvr"> GAME OVER</h1>
        <button id="restartBtn" onclick="RestartGame()"> Restart </button>
        `
        
    }
    
    // selecting random index from the empty box list
    let box1=Math.floor(Math.random()*emptyBoxes.length); // index1
    // getting the column and row val
    let randomColumn1=emptyBoxes[box1]%10;
    let randomRow1=Math.floor(emptyBoxes[box1]/10);

    // if all empty then select two boxes;
    if(emptyBoxes.length==16){
        let box2=Math.floor(Math.random()*emptyBoxes.length); // index2
        let randomColumn2=emptyBoxes[box2]%10;
        let randomRow2=Math.floor(emptyBoxes[box2]/10);
        board[randomRow1][randomColumn1]=2;    
        board[randomRow2][randomColumn2]=2;    
    }
    else if(!flag){ // if flag is false then do this
        
        // updating the board elem and putting 2 or 4 usnig the array
        let options =[2,2,2,2,2,2,2,2,2,4,4,4] // this increases the chance of 2 over 4.
        board[randomRow1][randomColumn1]=options[Math.floor(Math.random()*12)];
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
    // create the array first 
    // change the array
    // update the boardll
    for(c=0;c<column;c++){
        let array=[];
        for(r=0;r<rows;r++){
            array.push(board[r][c]);
        }
        LeftOperation(array);
        // after the array has been processed it is the placed at its correct place
        for(r=0;r<rows;r++){
            board[r][c]=array[r];
        }
    }
    selectEmptyBoxes();
}

function changeDown() {
    // create the array first 
    // change the array
    // update the boardll
    for(c=0;c<column;c++){
        let array=[];
        for(r=0;r<rows;r++){
            array.push(board[r][c]);
        }
        RightOperation(array);
        // after the array has been processed it is the placed at its correct place
        for(r=0;r<rows;r++){
            board[r][c]=array[r];
        }
    }
    selectEmptyBoxes();
}
function changeLeft() {
    for (r = 0; r < rows; r++) {
        // selecting a row
        let array = board[r];
        LeftOperation(array);
    
    }
    selectEmptyBoxes();
}

function changeRight() {
        for (r = 0; r < rows; r++) {
            let array = board[r];
            RightOperation(array);    
        }
        selectEmptyBoxes();
}

function UpdateScore(scoreVal){
    score+=scoreVal;
    if(score>bestScore){
        bestScore=score;
        bestScoreVal.innerText=bestScore;
    }
    // updating the dom
    currScoreVal.innerText=score;
}

function LeftOperation(array){
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
                    UpdateScore(arrayWithouZeros[0]);
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
                        UpdateScore(arrayWithouZeros[i]);
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
                        UpdateScore(arrayWithouZeros[i]);
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


function RightOperation(array){
    let arrayWithouZeros=array.filter(num=>num!==0);
            // if it has some elems then do something 
            if(arrayWithouZeros.length){
                if(arrayWithouZeros.length==1){
                    // replacing the original array by pushing to right 
                    array[3]=arrayWithouZeros[0];
                    // for(let i=0;i<4-awz.length)
                    for(let i=0;i<3;i++){
                        array[i]=0;
                    }
                }
                else if(arrayWithouZeros.length==2){
                    // if both elems are same 
                    if(arrayWithouZeros[0]===arrayWithouZeros[1]){
                        arrayWithouZeros[1]*=2;
                        UpdateScore(arrayWithouZeros[1]);
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
                            UpdateScore(arrayWithouZeros[i]);
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
                            UpdateScore(arrayWithouZeros[i]);
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




// ager move karne ka jagha na ho tab new add nahi karna hai 
// make mobile working as well