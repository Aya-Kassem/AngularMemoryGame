import { Component, Input } from '@angular/core';
import { BoardCellComponent } from '../board-cell/board-cell.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ChangeSpinnerVisability } from '../../../Shared/Store/Spinner/spinner.actions';
import { Game } from '../../../Shared/Store/Game/game.state';
import { Observable } from 'rxjs';
import { Player } from '../../../Shared/Store/Player/player.state';
import { calcMovesLeft, cancelRound, restartRound, setLevelCardsNum, setLevelMoves, terminateRound } from '../../../Shared/Store/Game/game.actions';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../Shared/Dialog/dialog.component';


@Component({
    selector: 'gameBoard',
    standalone: true,
    imports: [BoardCellComponent, CommonModule, DialogComponent],
    templateUrl: './game-board.component.html',
    styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {
    gameInfo$: Observable<Game> = this._Store.select('GameInfo');
    playerInfo$: Observable<Player> = this._Store.select('PlayerInfo');
    minutes: number = 0;
    seconds: number = 59;
    intervalId!: any;
    level!: string;
    levelMovesNumber!: number;
    movesLeft!: number;
    showResultDialog: boolean = false;

    constructor(
        private _Router: Router, 
        private _Store: Store<{ 'ChangeSpinnerVisability': boolean, 'GameInfo': Game, 'PlayerInfo': Player }>
        ) {}
    ngOnInit() {
        this.playerInfo$.subscribe((playerInfo) => this.level = playerInfo.level);
        this.gameInfo$.subscribe();
        this.setLevelMoves();
        this.setLevelCardsNumber(this.level);       
        this.setRoundClock();
        this.showResult();
    }

    restartRound() {
        this._Store.dispatch(ChangeSpinnerVisability({ isVisiable: true }));
        this._Store.dispatch(restartRound({ numOfFlippedCards: 0, moves: 0, misses: 0 }));
        this.setLevelMoves();
    }

    setLevelCardsNumber(level: string) {
        let cardsNum: number = 0;
        switch (level) {
            case 'Easy':
                cardsNum = 16;
                break;
            case 'Medium':
                cardsNum = 20;
                break;
            case 'Hard':
                cardsNum = 24;
                break;
            default:
                cardsNum = 0;
                break;
        }
        this._Store.dispatch(setLevelCardsNum({ levelCardsNumber: cardsNum }))
    }

    cancelRound() {
        this._Store.dispatch(cancelRound({ roundCanceled: true }));
        this._Store.dispatch(ChangeSpinnerVisability({ isVisiable: true }));
        this._Router.navigate(['']);
    }

    setLevelMoves() {
        switch (this.level) {
            case ('Easy'):
                this.levelMovesNumber = 32;
                break;
            case ('Medium'):
                this.levelMovesNumber = 40;
                break;
            case ('Hard'):
                this.levelMovesNumber = 48;
                break;
            default:
                this.levelMovesNumber = 0
                break;
        }
        this.movesLeft = this.levelMovesNumber;
        this._Store.dispatch(setLevelMoves({ allMoves: this.levelMovesNumber }))
        this._Store.dispatch(calcMovesLeft({ movesLeft: this.levelMovesNumber }));
    }

    setLevelTime() {
        let allowedTime;
        if (this.level != 'Easy') {
            allowedTime = this.level == 'Medium' ? 10 : 5;
        }
        return allowedTime
    }

    setRoundClock() {
        this.minutes = this.setLevelTime()! - 1;
        this.intervalId = setInterval(() => {
            this.seconds--;
            if (this.seconds < 0) {
                this.minutes--;
                this.seconds = 59;
            }

            if (this.minutes == 0 && this.seconds == 0) this.stopClock();
        }, 1000)
    }

    stopClock() {
        clearInterval(this.intervalId)
        this.terminateRound(true, 'Time Out!');
    }

    terminateRound(roundTerminated: boolean, terminateReason: string) {
        this._Store.dispatch(terminateRound({ roundTerminated, terminateReason }))
    }

    showResult(){
        this.gameInfo$.subscribe((info) => {
            if ((info.levelCardsNumber == 0 || info.roundTerminated) && !info.roundCanceled) {
                setTimeout(() => {
                    this.showResultDialog = true;
                }, 1000)              
            }
        })
    }

    checkRedo(val: boolean){
        if(val) this.showResultDialog = false;
        this.restartRound();        
    }

}
