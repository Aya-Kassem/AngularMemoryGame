export interface gameInfo {
    title: string,
    description: {
        cardsNum: Number,
        time: string,
        moves: string
    },
    index: Number
}

export const Info: gameInfo[] = [{
    title: 'Level: Easy',
    description: {
        cardsNum: 16,
        time: 'No Limit',
        moves: '32 Moves'
    },
    index: 0
}, {
    title: 'Level: Medium',
    description: {
        cardsNum: 20,
        time: '10 Minutes',
        moves: '40 Moves'
    },
    index: 1
}, {
    title: 'Level: Hard',
    description: {
        cardsNum: 24,
        time: '5 Minutes',
        moves: '48 Moves'
    },
    index: 2
}

]