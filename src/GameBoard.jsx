import React, { Component } from 'react';

class GameBoard extends Component {

    onClick = (id) => {
        if(this.isActive(id)) {
            if(this.props.G.cells[id] === -1) {
                
            }
            this.props.moves.clickCell(id);
            this.props.endTurn();
        }
    }

    isActive = (id) => {
        if(this.props.ctx.winner) return false;
        if(this.props.G.cells[id] && this.props.G.cells[id] !== -1) return false;
        return true;
    }

    render() { 
        const {winner} = this.props.ctx;
        const cellStyle = {
            border: '1px solid #555',
            width: '20px',
            height: '20px',
            textAlign: 'center',
        };
        console.log(this.props);
        let tbody = [];
        for (let i = 0; i < 9; i++) {
            let cells = [];
            for (let j = 0; j < 9; j++) {
                const id = 9 * i + j;
                cells.push(
                <td style={cellStyle}
                    key={id}
                    onClick={() => this.onClick(id)}>
                    {
                        //this.props.G.cells[id] !== -1 ? 
                            this.props.G.cells[id] 
                            //: null
                    }
                </td>
                );
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }
        return ( 
            <div>
                <table id="board">
                    <tbody>{tbody}</tbody>
                </table>
                <div>Winner is {winner}</div>
            </div> 
        )
    }
}
 
export default GameBoard;