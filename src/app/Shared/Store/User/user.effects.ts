import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { readPlayerInfo, storeUserState } from "./user.actions";
import { tap } from "rxjs";
import { User } from "./user.state";

@Injectable()
export class UserEffects {

    constructor(
        private _Actions$: Actions,
        private _Store: Store<{UserInfo: User}>
    ) {}

    storeUserState$ = createEffect(() =>
        this._Actions$.pipe(
            ofType(storeUserState),
            tap(() => {
                this._Store.select('UserInfo').subscribe(userState => {
                    localStorage.setItem('Player', JSON.stringify(userState));
                });
            })
        ),
        { dispatch: false }
    );


    // readUserInfo$ = createEffect(() => 
    //         this._Actions$.pipe(
    //             ofType(readPlayerInfo),

    //         )
    // )
}