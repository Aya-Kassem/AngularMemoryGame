import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createPlayerInfo, onReadPlayesInfoSuccess, readPlayerInfo } from "./player.actions";
import { of, switchMap, tap } from "rxjs";
import { Player } from "./player.state";
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

@Injectable()
export class PlayerEffects {
    private readonly platformId = inject(PLATFORM_ID);
    constructor(
        private _Actions$: Actions,
        private _Store: Store<{ PlayerInfo: Player }>
    ) { }


    // When Player Clicks Play Button ...
    createPlayer$ = createEffect(() =>
        this._Actions$.pipe(
            ofType(createPlayerInfo),
            tap(() => {
                this._Store.select('PlayerInfo').subscribe(userState => {
                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.setItem('Player', JSON.stringify(userState));
                    }
                });
            })
        ),
        { dispatch: false }
    );

    //When App Running if player already register change inital state with player info ...
    readPlayerInfo$ = createEffect(() =>
        this._Actions$.pipe(
            ofType(readPlayerInfo),
            tap(() => {
                if (isPlatformBrowser(this.platformId)) {
                    const userInfo = localStorage.getItem('Player');
                    if (userInfo) {
                        const player = JSON.parse(userInfo);
                        const { name, level, newPlayer } = player;
                        this._Store.dispatch(onReadPlayesInfoSuccess({ name, level, newPlayer }));
                    }
                }
            })
        ),
        { dispatch: false }
    );
}

