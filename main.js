// Handles the players of the game
function player(symbol) {
    function getSymbol() {
        return symbol
    }

    return {getSymbol}
}

const playerX = player('X')
const playerO = player('O')

// Handles the board of the game
const gameboard = (function() {
    const board = [
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

    return {getBoard, makeMove}
})()

// Handles the game logic
const game = (function() {
    let currentPlayer = playerX
    let previousPlayer = playerO

    function checkGameStatus() {
        // TODO: Complete checking for win feature
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
        } else if(winner != '') {
            result = `${winner}`
        } else {
            result = 'none'
        }
        
        return result
    }

    function getPlay(){
        const submitButton = document.querySelector('#submit')

        submitButton.addEventListener('click', event => {
            event.preventDefault()

            const position = document.querySelector('#position').value - 1

            // Confirms if the player is allowed to play there by checking if the value input from the user is equal to the value in that array position. If it is not, then it means that block has been played in
            if(gameboard.getBoard()[position] == position) {
                // Determining who's turn it is to play
                if(previousPlayer == playerX) {
                    currentPlayer = playerO
                } else {
                    currentPlayer = playerX
                }
                previousPlayer = currentPlayer

                const newBoard = gameboard.makeMove(currentPlayer.getSymbol(), position)
                const gameStatus = checkGameStatus()
                console.log(newBoard)
                console.log(checkGameStatus())

                if(gameStatus == 'Draw') {
                    console.log('DRAWWW!')
                } else if(gameStatus == 'X' || gameStatus == 'O') {
                    console.log(`Player '${gameStatus}' has Won!`)
                } else {
                    console.log('Moving on...')
                }

                return newBoard
            } else {
                return 'Cannot play there'
            }
        })
    }

    return {getPlay}
})()

game.getPlay()