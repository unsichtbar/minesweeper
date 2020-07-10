import React from 'react';
import Game, {DIFFICULTY} from './minesweeper';
function App() {
  const {current:game} = React.useRef(new Game(DIFFICULTY.HARD))
  const {x, y} = game.getBoardSize()

  const board: Array<JSX.Element> = []
  for(let i = 0; i < x; i++) {
    for(let j = 0; j < y; j++) {
      board.push(<Tile xPos={i} yPos={j} value={game.reveal({x: i, y: j})} onClick={() => {game.reveal({x: i, y: j})}}/>)
    }
  }
  return (
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${x}, auto)`, gridTemplateRows: `repeat(${y}, auto)`}}>
      {board}
    </div>
  );
}

const Tile: React.FC<{xPos: number, yPos: number, onClick: any, value: number | undefined}> = ({xPos, yPos, onClick, value}) => {
  return <span onClick={onClick} style={{border: "1px solid black", width: '25px', height: '25px'}}>{value}</span>
}

export default App;
