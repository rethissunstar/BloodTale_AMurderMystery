const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordle = 'UTAH'

const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'DELETE',
]
const guessRows = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
]
let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

// For Input using Mouse
const handleClick = (letter) => {
    if (!isGameOver) {
        if (letter === 'DELETE') {
            deleteLetter()
            console.log('guessRows', guessRows)
            return
        }
        if (letter === 'ENTER') {
            checkRow()
            console.log('guessRows', guessRows)
            return
        }
        addLetter(letter)
        console.log('guessRows', guessRows)
    }
}

// For Input using Keyboard
document.addEventListener('keydown', (event) => {
    const letter = event.key.toUpperCase();
    if (!isGameOver) {
      if (letter === 'DELETE') {
        deleteLetter();
        console.log('guessRows', guessRows);
        return;
      }
      if (letter === 'ENTER') {
        checkRow();
        console.log('guessRows', guessRows);
        return;
      }
      if (/^[A-Z]$/.test(letter)) {
        addLetter(letter);
        console.log('guessRows', guessRows);
      }
    }
  });

const addLetter = (letter) => {
    if (currentTile < 4 && currentRow < 5) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if (currentTile > 3) {
        console.log('Guess is: '+guess,' Wordle word is: '+wordle)
        flipTile()
        if (wordle == guess) {
            showMessage('Well done')
            // /----/
            var solutionMeanContainer = document.getElementById("solutionmean-container");
            solutionMeanContainer.innerHTML =  wordle +' : The same place i laid the groundwork for my legend is where they caught me.';
            console.log('You did it..'+wordle,': `The same place i laid the groundwork for my legend is where they caught me.`')
            // /----/
            isGameOver = true
            return
        } else {
            if (currentRow >= 4){
                isGameOver = false
                showMessage('Game Over')
                return
            }
            if (currentRow < 4){
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}
