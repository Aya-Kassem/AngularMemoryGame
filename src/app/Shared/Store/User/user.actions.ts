import { createAction, props } from "@ngrx/store";
import { User } from "./user.state";

export const instructions = createAction(
    '[Main Page] InstructionsReview',
    props<{reviewInstructions: boolean}>()
)


export const userInfoAvailable = createAction(
    '[Main Page] User Info',
    props<{name: string, level: string, newUser: boolean}>()
)

export const storeUserState = createAction(
    '[Main Page] StoreUserState'
);


export const readPlayerInfo = createAction(
    '[Game Board] Player Info',
    props<User>()
)