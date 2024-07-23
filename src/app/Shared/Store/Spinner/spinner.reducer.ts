import { createReducer, on } from "@ngrx/store";
import { ChangeSpinnerVisability } from "./spinner.actions";

const isVisiable: boolean = true; 
export const spinnerVisiabliltyReducer = createReducer(
    isVisiable,
    on(ChangeSpinnerVisability , (_, { isVisiable }) => isVisiable)
)