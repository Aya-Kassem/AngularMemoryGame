import { createAction, props } from "@ngrx/store";
import { Game } from "./game.state";

export const checkFlippedCardsNum = createAction(
    '[Game Board] checkFlippedCardsNum',
    props<{ cardsNum: number }>()
)

export const playerMoves = createAction(
    '[Game Board] playerMoves',
    props<{ movesNum: number }>()
)

export const calcMovesLeft = createAction(
    '[Game Board] Calculate Moves Left',
    props<{movesLeft: number}>()
)

export const setLevelMoves = createAction(
    '[Game Board] Set Level Moves',
    props<{allMoves: number}>()
)

export const mismatchMoves = createAction(
    '[Game Board] mismatchMoves',
    props<{ mismatchMoves: number }>()
)

export const restartRound = createAction(
    '[Game Board] Restart Round',
    props<{ numOfFlippedCards: number, moves: number, misses: number }>()
)

export const cancelRound = createAction(
    '[Game Board] Cancel Round',
    props<{roundCanceled: boolean}>()
)

export const resetStateOnCancel = createAction(
    '[Game Board] Reset State On Cancel'
)

export const showResult = createAction(
    '[Game Board] Show Result',
    props<{ roundEnded: boolean }>()
)

export const setLevelCardsNum = createAction(
    '[Main Page] Set Level Cards Num',
    props<{ levelCardsNumber: number }>()
)

export const decreaseNumOfFlippedCards = createAction(
    '[Game Board] Remove Number of Flipped Cards'
)

export const terminateRound = createAction(
    '[Game Board] Terminate Round',
    props<{ roundTerminated: boolean, terminateReason: string }>()
)

export const gameStarted = createAction(
    '[Game Intro] Start Game',
    props<{gameStarted: boolean}>()
)

