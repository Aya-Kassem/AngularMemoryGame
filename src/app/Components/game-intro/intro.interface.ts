export interface gameInfo {
    title: string,
    description: {
        cardsNum: {
            min: Number,
            max: Number
        },
        time: string,
        moves: string
    },
    index: Number
}

export const Info: gameInfo[] = [{
    title: 'Level1: Easy',
    description: {
        cardsNum: {
            min: 6,
            max: 12
        },
        time: 'No Time Specified',
        moves: 'Limited'
    },
    index: 0
}, {
    title: 'Level2: Medium',
    description: {
        cardsNum: {
            min: 12,
            max: 24
        },
        time: '15 min',
        moves: 'UnLimited Moves'
    },
    index: 1
}, {
    title: 'Level3: Hard',
    description: {
        cardsNum: {
            min: 24,
            max: 48
        },
        time: '10 min',
        moves: 'UnLimited Moves'
    },
    index: 2
}

]