function player(symbol) {
    function getSymbol() {
        return symbol
    }

    return {getSymbol}
}

const playerX = player('X')
const playerO = player('O')

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
        result = ''

        board[position] = symbol

        return board
    }

    return {getBoard, makeMove}
})()

const game = (function() {
    function getPlay(player){

        const submitButton = document.querySelector('#submit')

        submitButton.addEventListener('click', event => {
            event.preventDefault()

            const position = document.querySelector('#position').value - 1

            if(gameboard.getBoard()[position] == position) {
                const newBoard = gameboard.makeMove(player.getSymbol(), position)
                console.log(newBoard)
            } else {
                console.log('Cannot play there!')
            }
        })
    }

    function runGame() {
        let currentPlayer = playerX
        let nextPlayer = playerO

        for(let i = 0; i < 9; i++) {
            if(currentPlayer == playerX) {
                nextPlayer = playerO
            } else {
                nextPlayer = playerX
            }

            getPlay(currentPlayer)

            currentPlayer = nextPlayer
        }
    }

    return {runGame}
})()

game.runGame()