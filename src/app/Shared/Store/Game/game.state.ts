export interface Game {
    moves: number,
    misses: number,
    numOfFlippedCards: number,
    roundEnded: boolean,
    levelCardsNumber: number,
    levelTime: number,
    roundTerminated: boolean,
    terminateReason: string,
    levelMoves:number,
    movesLeft: number,
    roundCanceled: boolean,
    gameStarted: boolean
}

export const gameInitialState: Game = {
    moves: 0,
    misses: 0,
    numOfFlippedCards: 0,
    roundEnded: false,
    levelCardsNumber: 0,
    levelTime: 0,
    roundTerminated: false,
    terminateReason: '',
    levelMoves: 0,
    movesLeft: 0,
    roundCanceled: false,
    gameStarted: false
}
