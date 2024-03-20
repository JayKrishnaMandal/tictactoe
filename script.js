
let player='o';
let opponent='x';
let currentPlayer=opponent;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

const gridItems = document.querySelectorAll('.grid-item');
const restartBtn = document.querySelector('#restart-btn');
const message=document.querySelector('#text');

gridItems.forEach(gridItem => {
	gridItem.addEventListener('click', () => {
		if (gridItem.textContent === '') {
			gridItem.classList.add(currentPlayer);
			gridItem.textContent = currentPlayer;
			gameBoard[gridItem.id] = currentPlayer;
			checkWin(currentPlayer);
			currentPlayer = currentPlayer === player ? opponent : player;
			if(currentPlayer==player && !checkWin(currentPlayer)){
				bestMove=findBestMove(gameBoard);
				displayMessage("AI is thinking ....");
				setTimeout(()=>{
				ai=document.getElementById(bestMove);
				ai.classList.add(currentPlayer);
				ai.textContent=currentPlayer;
				
				gameBoard[bestMove] = currentPlayer;
				displayMessage(" Its Your turn ");
				checkWin(currentPlayer);
				currentPlayer=opponent;},200);
				
				return;
			}
		}
	});
});
function checkWin(currentPlayer){
	if(evaluate(gameBoard)==-10){
		displayMessage("X has won");
		
		return true;
	}
	if(evaluate(gameBoard)==10){
		displayMessage("O has won");
		
		return true;
	}
	if(evaluate(gameBoard)==0){
		if(!isMovesLeft(gameBoard)){
			
		displayMessage(" No one has won");
		return true;
		
	}
		
		return false;
	}
	
	return false;
}
function displayMessage(Message){
	message.classList.add("message-box");
	message.innerHTML=Message;

}

function restartGame() {
	gameBoard = ['', '', '', '', '', '', '', '', ''];
	gridItems.forEach(gridItem => {
		gridItem.classList.remove('x', 'o');
		gridItem.textContent = '';
	});
	currentPlayer = 'x';
	displayMessage(' Its '+currentPlayer +' turns');
}

restartBtn.addEventListener('click', () => {
	restartGame();
});

function isMovesLeft(board)
{
    for(let i = 0; i < 9; i++)
        
            if (board[i] == ''){
                return true;}
                  
    return false;
}
  

function findBestMove(board)
{
    let bestVal = -1000;
    let bestMove = null;
    
    // Traverse all cells, evaluate 
    // minimax function for all empty 
    // cells. And return the cell
    // with optimal value.
    for(let i = 0; i < 9; i++)
    {
        
              
            // Check if cell is empty
            if (board[i] == '')
            {
                  
                // Make the move
                board[i] = player;
   
                // compute evaluation function 
                // for this move.
                let moveVal = minimax(board, 0, false);
   
                // Undo the move
                board[i] = '';
   
                // If the value of the current move 
                // is more than the best value, then 
                // update best
                if (moveVal > bestVal)
                {
                   bestMove=i;
                    bestVal = moveVal;
                
             }
        }
    }
   
   
   
    return bestMove;
}

function evaluate(board)
{
	const winningPositions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];   
for (let i = 0; i < winningPositions.length; i++) {
	const [a, b, c] = winningPositions[i];
	if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
			
		if(board[a]==player){
			return +10;
		}
		else{
			return -10;
		}
		
	}
}
 
	
	 // Else if none of them have
	 // won then return 0
	 return 0;
 }
 function minimax(board, depth, isMax)
 {
     let score = evaluate(board);
    
     // If Maximizer has won the game
     // return his/her evaluated score
     if (score == 10)
         return score;
    
     // If Minimizer has won the game
     // return his/her evaluated score
     if (score == -10)
         return score;
    
     // If there are no more moves and
     // no winner then it is a tie
     if (isMovesLeft(board) == false)
         return 0;
    
     // If this maximizer's move
     if (isMax)
     {
         let best = -1000;
    
         // Traverse all cells
         for(let i = 0; i < 9; i++)
         {
            
                   
                 // Check if cell is empty
                 if (board[i]=='')
                 {
                       
                     // Make the move
                     board[i] = player;
    
                     // Call minimax recursively 
                     // and choose the maximum value
                     best = Math.max(best, minimax(board,
                                     depth + 1, !isMax));
    
                     // Undo the move
                     board[i] = '';
                 
             }
         }
         return best;
     }
    
     // If this minimizer's move
     else
     {
         let best = 1000;
    
         // Traverse all cells
         for(let i = 0; i < 9; i++)
         {
              
                 // Check if cell is empty
                 if (board[i] == '')
                 {
                       
                     // Make the move
                     board[i] = opponent;
    
                     // Call minimax recursively and 
                     // choose the minimum value
                     best = Math.min(best, minimax(board,
                                     depth + 1, !isMax));
    
                     // Undo the move
                     board[i] = '';
                 
             }
         }
         return best;
     }
 }
