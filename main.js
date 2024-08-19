// Handles the players of the game
// TODO: Implement feature to break out of getPlay() function if there is a draw or a win

function player(symbol, name) {
    function getSymbol() {
        return symbol
    }

    function getName() {
        return name
    }

    return {getSymbol, getName}
}

const alertBox = document.querySelector('.alert')

const firstPlayerName = prompt('Player One("X"), enter your name:')
const secondPlayerName = prompt('Player One("O"), enter your name:')

const playerX = player('X', firstPlayerName)
const playerO = player('O', secondPlayerName)

// Handles the board of the game
const gameboard = (function() {
    let board = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
    ]

    function getBoard() {
        return board
    }

    function makeMove(symbol, position) {
        board[position] = symbol

        return board
    }

    function clearBoard() {
        board = [
            0, 1, 2,
            3, 4, 5,
            6, 7, 8
        ]
    }

    return {getBoard, makeMove, clearBoard}
})()

// Handles the game logic
const game = (function() {
    let gameOver = false

    let currentPlayer = playerX
    let previousPlayer = playerO

    function checkGameStatus() {
        let isDraw = false
        let winner = ''
        let result = ''

        function hasSymbol(element) {
            if(element == 'X' || element == 'O') {
                return element
            }
        }

        // Determine if there is a winner
        const row1 = [gameboard.getBoard()[0], gameboard.getBoard()[1], gameboard.getBoard()[2]]
        const row2 = [gameboard.getBoard()[3], gameboard.getBoard()[4], gameboard.getBoard()[5]]
        const row3 = [gameboard.getBoard()[6], gameboard.getBoard()[7], gameboard.getBoard()[8]]

        const column1 = [gameboard.getBoard()[0], gameboard.getBoard()[3], gameboard.getBoard()[6]]
        const column2 = [gameboard.getBoard()[1], gameboard.getBoard()[4], gameboard.getBoard()[7]]
        const column3 = [gameboard.getBoard()[2], gameboard.getBoard()[5], gameboard.getBoard()[8]]

        const diagonalRight = [gameboard.getBoard()[2], gameboard.getBoard()[4], gameboard.getBoard()[6]]
        const diagonalLeft = [gameboard.getBoard()[0], gameboard.getBoard()[4], gameboard.getBoard()[8]]

        const sections = [row1, row2, row3, column1, column2, column3, diagonalRight, diagonalLeft]

        function checkForWinPattern(section) {
            const filterOfSection = section.filter(hasSymbol)
            const filterOfSectionAsString = filterOfSection.join('')

            if(filterOfSectionAsString.includes('XXX')) {
                winner = playerX.getSymbol()
            } else if(filterOfSectionAsString.includes('OOO')) {
                winner = playerO.getSymbol()
            }
        }

        sections.forEach(section => {
            checkForWinPattern(section)
        })

        // Determine if there is a draw
        const arrOfPlayedCells = gameboard.getBoard().filter(hasSymbol)

        if(arrOfPlayedCells.length === 9) {
            isDraw = true
        }

        if(isDraw === true) {
            result = 'Draw'
            gameOver = true
        } else if(winner != '') {
            result = `${winner}`
            gameOver = true
        } else {
            result = 'none'
        }
        
        return result
    }

    function getPlay(){
        const boardCells = document.querySelectorAll('.board-cell')

        alertBox.innerText = ''

        boardCells.forEach(cell => {
            cell.addEventListener('click', () => {
                const position = cell.id

                if(cell.innerText == '') {
                    // Determining who's turn it is to play
                    if(previousPlayer == playerX) {
                        currentPlayer = playerO
                    } else {
                        currentPlayer = playerX
                    }
                    previousPlayer = currentPlayer
    
                    const newBoard = gameboard.makeMove(currentPlayer.getSymbol(), position)
                    const gameStatus = checkGameStatus()

                    cell.innerText = gameboard.getBoard()[Number(cell.id)]
    
                    if(gameStatus == 'Draw') {
                        alertBox.innerText = 'DRAW!'
                    } else if(gameStatus == 'X' || gameStatus == 'O') {
                        alertBox.innerText = `${currentPlayer.getName()}(${currentPlayer.getSymbol()}) has Won!`
                    } else {
                        alertBox.innerText = `${previousPlayer.getName()}(${previousPlayer.getSymbol()}) just played!`
                    }
    
                    return newBoard
                } else {
                    alertBox.innerHTML = `You can't play there!`
                }
            })
        })
    }

    return {getPlay}
})()

const startButton = document.querySelector('.start').addEventListener('click', () => {
    game.getPlay()
})

const restartButton = document.querySelector('.restart').addEventListener('click', () => {
    location.reload()
})