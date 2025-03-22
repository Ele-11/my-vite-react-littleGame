import { useState } from 'react'
import Board from './Components/Board'
import './styles.css'



//App===Game----->Board----->Square
export default function App() {
  // const [xIsNext, setXIsNext] = useState(true);   //  可以把这个状态放到给简化为变量
  const [history, setHistory] = useState( [ Array(9).fill(null) ] );
  
  const [currentMove,setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];//这里的当前棋局作为props传递给Board组件
  

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove+1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);// 切换玩家回合
    // setXIsNext(!xIsNext);  
  }

  function jumpTo(next_move_index) {
    setCurrentMove(next_move_index)
  }

  const moves = history.map((squares, move_index) => {
    let info = move_index ? 'Go to move #' + move_index : 'Go to game start';
    return (
      <li key={move_index}>
        <button onClick={() => jumpTo(move_index)}>{info}</button>
      </li>
    );
  });


  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares}  onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  )

}



