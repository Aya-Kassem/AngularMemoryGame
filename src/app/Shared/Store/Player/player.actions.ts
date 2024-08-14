import { createAction, props } from "@ngrx/store";
import { Player } from "./player.state";

export const createPlayerInfo = createAction(
    '[Main Page] Create Player Info',
    props<{name: string, level: string, newPlayer: boolean}>()
)


export const readPlayerInfo = createAction(
    '[Main Page] Player Info'
)

export const onReadPlayesInfoSuccess = createAction(
    '[Main Page] Player Info Success',
    props<{ name: string; level: string; newPlayer: boolean }>()
)
