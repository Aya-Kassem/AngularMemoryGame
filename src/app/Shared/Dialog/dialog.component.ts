import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { Game } from '../Store/Game/game.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { terminateRound } from '../Store/Game/game.actions';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        DialogModule
    ],
    selector: 'resultDialog',
    templateUrl: './dialog.component.html'
})


export class DialogComponent {
    visible: boolean = false;
    gameInfo$: Observable<Game> = this._Store.select('GameInfo');
    @Output() play: EventEmitter<boolean> = new EventEmitter(false);

    constructor(private _Store: Store<{ 'GameInfo': Game }>, private _Router: Router) { }
    ngOnInit() {
        this.gameInfo$.subscribe((info) => {
            if (info.levelCardsNumber == 0 || info.roundTerminated) this.showDialog()
        });
    }
    showDialog() {
        this.visible = true;
    }

    playAgain() {
        this._Store.dispatch(terminateRound({ roundTerminated: false, terminateReason: '' }));
        this.play.emit(true);
        this._Router.navigate(['gameBoard']);
    }
    closeDialog(){
        this._Store.dispatch(terminateRound({ roundTerminated: false, terminateReason: '' }));
        this._Router.navigate(['']);
    }
}
