// js
const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
}

const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('.button'),
    win: document.querySelector('.win'),
}

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const ramdomIndex = Math.floor(Math.random() * (i + 1))
        const original = clonedArray[i]

        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRamdom = (array, items) => {
    const clonedArray = [...array]
    const ramdomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.ramdom() * clonedArray.length)

        ramdomPicks.push(clonedArray[ramdomIndex])
        clonedArray.splice(ramdomIndex, 1)
        
    }
}