import { createAction, props } from "@ngrx/store";

export const ChangeSpinnerVisability = createAction(
    '[Main Page] Spinner Visability',
    props<{isVisiable: boolean}>()
)