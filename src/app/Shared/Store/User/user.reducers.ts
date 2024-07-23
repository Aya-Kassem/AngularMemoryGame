import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import { instructions, userInfoAvailable } from "./user.actions";

export const userInfoReducer = createReducer(
    initialUserState,
    on(instructions, (state, { reviewInstructions }) => ({
        ...state,
        reviewInstructions
    })),


    on(userInfoAvailable, (state, { name, level, newUser }) => ({
        ...state,
        name,
        level,
        newUser
    }))
)


