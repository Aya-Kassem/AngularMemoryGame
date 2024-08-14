import { createReducer, on } from "@ngrx/store";
import { gameInitialState } from "./game.state";
import {
    calcMovesLeft,
    cancelRound,
    checkFlippedCardsNum,
    decreaseNumOfFlippedCards,
    gameStarted,
    mismatchMoves,
    playerMoves,
    resetStateOnCancel,
    restartRound,
    setLevelCardsNum,
    setLevelMoves,
    showResult,
    terminateRound
} from "./game.actions";

export const gameReducer = createReducer(
    gameInitialState,
    on(checkFlippedCardsNum, (state, { cardsNum }) => {
        return {
            ...state,
            numOfFlippedCards: cardsNum
        };
    }),

    on(playerMoves, (state, { movesNum }) => {
        return {
            ...state,
            moves: movesNum
        };
    }),

    on(calcMovesLeft, (state, { movesLeft }) => {
        return {
            ...state,
            movesLeft
        }
    }),

    on(setLevelMoves, (state, { allMoves }) => ({
        ...state,
        levelMoves: allMoves
    })),

    on(mismatchMoves, (state, { mismatchMoves }) => {
        return {
            ...state,
            misses: mismatchMoves
        };
    }),

    on(restartRound, (state, { numOfFlippedCards, moves, misses }) => {
        return {
            ...state,
            numOfFlippedCards,
            moves,
            misses
        }
    }),

    on(showResult, (state, { roundEnded }) => ({
        ...state,
        roundEnded
    })),

    on(setLevelCardsNum, (state, { levelCardsNumber }) => ({
        ...state,
        levelCardsNumber
    })),

    on(decreaseNumOfFlippedCards, (state) => ({
        ...state,
        levelCardsNumber: state.levelCardsNumber - 2
    })),

    on(terminateRound, (state, { roundTerminated, terminateReason }) => ({
        ...state,
        roundTerminated,
        terminateReason
    })),

    on(cancelRound, (state, { roundCanceled }) => {
        return {
            ...state,
            roundCanceled
        }
    }),

    on(resetStateOnCancel, (state) => {
        return {
            ...state,
            misses: gameInitialState.misses,
            movesLeft: gameInitialState.movesLeft,
            moves: gameInitialState.moves,
            numOfFlippedCards: gameInitialState.numOfFlippedCards
        }
    }),

    on(gameStarted, (state, { gameStarted }) => ({
        ...state,
        gameStarted
    })),



);