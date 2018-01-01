import React, { Component } from 'react';
import Game from 'boardgame.io/game';

//const isVictory = (cells) => {
    // if(cells[0] !== null) {
    //     if(cells[0] === cells[1] && 
    //         cells[1] !== null && cells[1] === cells[2]) return true;
    //     if(cells[0] === cells[3] && 
    //         cells[3] !== null && cells[3] === cells[6]) return true;
    //     if(cells[0] === cells[4] && 
    //         cells[4] !== null && cells[4] === cells[8]) return true;
    // }
        
    // if(cells[2] !== null) {
    //     if(cells[2] === cells[5] && cells[5] !== null && cells[5] === cells[8]) return true;
    //     if(cells[2] === cells[4] && cells[4] && cells[4] === cells[6]) return true;
    // }

    // if(cells[1] && cells[1] === cells[4] && cells[4] && cells[4] === cells[7]) return true;

    // if(cells[3] && cells[3] === cells[4] && cells[4] && cells[4] === cells[5]) return true;

    // if(cells[6] && cells[6] === cells[7] && cells[7] && cells[7] === cells[8]) return true;

    //return false;
//}

const createRandomMinedArray = () => {
    const arr = Array(81).fill(null);
    for(let i = 0 ; i < 10 ; i++){
        const randomInt = Math.floor(Math.random() * 81);
        arr[randomInt] = -1;
    }
    return arr;
}

const calculateMinesAround = (cells,id) => {
    let mines = 0;
    //for(let i = 0 ; i < 81 ; i++) {
    if(id >= 1 && id <= 7) {
        //+1,+8,+9,+10
        if(cells[id+1] === -1) {
            mines += 1;
        }
        if(cells[id+8] === -1) {
            mines += 1;
        }
        if(cells[id+9] === -1) {
            mines += 1;
        }
        if(cells[id+10] === -1) {
            mines += 1;
        }
    } else if(id >= 73 && id <=  79) {
        //-10,-9,-8,+1,
        if(cells[id-10] === -1) {
            mines += 1;
        }
        if(cells[id-9] === -1) {
            mines += 1;
        }
        if(cells[id-8] === -1) {
            mines += 1;
        }
        if(cells[id+1] === -1) {
            mines += 1;
        }
    } else if(id % 9 === 0) {
        //+1,-9,+9
        if(cells[id+1] === -1) {
            mines += 1;
        }
        if(cells[id-9] && cells[id-9] === -1){
            mines += 1;
        }
        if(cells[id+9] && cells[id+9] === -1){
            mines += 1;
        }
    } else if(id % 9 === 8) {
        //-1
        if(cells[id-1] === -1) {
            mines += 1;
        }
        if(cells[id-9] && cells[id-9] === -1){
            mines += 1;
        }
        if(cells[id+9] && cells[id+9] === -1){
            mines += 1;
        }
    } else {
        if(cells[id-10] === -1) {
            mines = mines + 1;
        }
        if(cells[id-9] === -1) {
            mines = mines + 1;
        }
        if(cells[id-8] === -1) {
            mines = mines + 1;
        }
        if(cells[id-1] === -1) {
            mines = mines + 1;
        }
        if(cells[id+1] === -1) {
            mines = mines + 1;
        }
        if(cells[id+8] === -1) {
            mines = mines + 1;
        }
        if(cells[id+9] === -1) {
            mines = mines + 1;
        }
        if(cells[id+10] === -1) {
            mines = mines + 1;
        }
    }
    console.log(mines);
    console.log('mines');
    return mines;
    //}
}

const isVictory = (cells) => {
    return cells.filter((cell) => cell === null).length == 0;
}

const TicTacToe = Game({
    setup: () => ({ cells: 
        createRandomMinedArray(),
        numPlayers : 1 
    }),
    moves: {
        clickCell(G, ctx, id) {
            // console.log(G); // the state 
            // console.log(ctx); // the actions
            // console.log(id); // id of element clicked
            console.log(id);
            let cells = [...G.cells];  // don't mutate original state.
            if(cells[id] !== -1) {
                cells[id] = calculateMinesAround(G.cells,id);
                console.log(cells[id]);
                return {...G, cells};      // don't mutate original state.
            }
            return {...G};
        }
    },

    victory : (G,ctx) => {
        //console.log(isVictory(G.cells));
        console.log(ctx);
        return isVictory(G.cells) ? ctx.currentPlayer : null
    }
});
 
export default TicTacToe;