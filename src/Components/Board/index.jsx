import Square from '../Square/index.jsx'

export default function Board({xIsNext,squares,onPlay}) {


    // 计算游戏状态
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if (checkAllSquaresFilled(squares)) {
        status = "平局";  // 平局状态
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");  // 下一玩家提示
    }

    // 处理方格点击事件
    function handleSquareClick(i) {
      // 阻止重复点击或游戏结束后的操作
      if(squares[i] || calculateWinner(squares) || checkAllSquaresFilled(squares)) {
          return; 
      }
      
      // 更新棋盘状态
      const nextSquares = squares.slice();
      nextSquares[i] = xIsNext ? 'X' : 'O';  // 根据当前玩家落子
      
      onPlay(nextSquares);
    }
  
    
    return (
      <div>
          <div className='status'><h3>{status}</h3></div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
        </div>
      </div>
    );
  }
  
  // 胜利条件判断函数
  function calculateWinner(squares) {
    // 所有可能的胜利线组合
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横向
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 纵向
      [0, 4, 8], [2, 4, 6] // 对角线
    ];
    
    // 遍历所有胜利条件
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // 检查三点是否相同且不为空
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];  // 返回胜利者符号
      }
    }
    return null;  // 无胜利者
  }
  
  // 棋盘填满检查函数
  function checkAllSquaresFilled(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return false; // 发现空位立即终止检查
    }
  }
  return true; // 全部9个格子均已填充
  }