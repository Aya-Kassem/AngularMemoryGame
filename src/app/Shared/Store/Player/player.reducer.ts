import { createReducer, on } from "@ngrx/store";
import { initialPlayerState } from "./player.state";
import { createPlayerInfo, onReadPlayesInfoSuccess } from "./player.actions";


export const playerInfoReducer = createReducer(
    initialPlayerState,
    on(onReadPlayesInfoSuccess, (state, { name, level, newPlayer }) => ({
        ...state,
        name,
        level,
        newPlayer
    })),

    on(createPlayerInfo, (state, {name, level, newPlayer }) => ({
        ...state,
        name,
        level,
        newPlayer
    }))

);