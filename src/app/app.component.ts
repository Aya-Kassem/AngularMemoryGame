import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { readPlayerInfo } from './Shared/Store/Player/player.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player } from './Shared/Store/Player/player.state';
import { ChangeSpinnerVisability } from './Shared/Store/Spinner/spinner.actions';
import { Game } from './Shared/Store/Game/game.state';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './Shared/Spinner/spinner.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, SpinnerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'memoryGame';
    showSpinner: boolean = true;
    playerExist: boolean = false;
    roundCanceled!: boolean;
    playerInfo$: Observable<Player> = this._Store.select('PlayerInfo');
    gameInfo$: Observable<Game> = this._Store.select('GameInfo');
    showResultDialog: boolean = false;

    constructor(
        private _Store: Store<{ 'ChangeSpinnerVisability': boolean, 'PlayerInfo': Player, 'GameInfo': Game }>) { }

    ngOnInit() {
        console.log('Parent Component Initalizes!');
        this.changeSpinnerVisiability(true);
        this.checkPlayerExist();
        this.showHideSpinner();
  
        this.resetGameOnCancel();
    }

    checkPlayerExist() {
        this.changeSpinnerVisiability(true);
        this._Store.dispatch(readPlayerInfo());
        this._Store.select('PlayerInfo').subscribe();
    }

    showHideSpinner() {
        this._Store.select('ChangeSpinnerVisability').subscribe((val) => {
            this.showSpinner = val
            setTimeout(() => {
                this.changeSpinnerVisiability(false);
            }, 1500);
        });

    }

    changeSpinnerVisiability(val: boolean) {
        this._Store.dispatch(ChangeSpinnerVisability({ isVisiable: val }));
    }

    resetGameOnCancel() {
        this.gameInfo$.subscribe((info) => {
            if (info.roundCanceled) this.showHideSpinner();
        })
    }



}
