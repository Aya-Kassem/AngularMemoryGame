import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Player } from '../../../Shared/Store/Player/player.state';
import { createPlayerInfo } from '../../../Shared/Store/Player/player.actions';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Info, gameInfo } from '../Shared/gameIntro.interface';
import { SpinnerComponent } from '../../../Shared/Spinner/spinner.component';
import { ChangeSpinnerVisability } from '../../../Shared/Store/Spinner/spinner.actions';
import { cancelRound, gameStarted, resetStateOnCancel, setLevelCardsNum } from '../../../Shared/Store/Game/game.actions';
import { Observable, Subscription } from 'rxjs';


@Component({
    selector: 'gameIntro',
    standalone: true,
    imports: [
        ButtonModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        SpinnerComponent
    ],
    templateUrl: './game-intro.component.html',
    styleUrl: './game-intro.component.scss'
})

export class GameIntroComponent {
    gameInfo: gameInfo[] = Info;
    username!:string;
    levels: String[] = ['Easy', 'Medium', 'Hard'];
    selectedLevel: string = 'Easy';
    playerExist$: Observable<Player> = this._Store.select('PlayerInfo');
    subscription!: Subscription;
    constructor(
        private _Store: Store<{ 'ChangeSpinnerVisability': boolean, 'PlayerInfo': Player }>, 
        private _Router: Router) {}

    ngOnInit() {
        console.log('Game Intro Component Intializes!');
        this.subscription = this.playerExist$.subscribe((player) =>  {
            this.username = player.name || '';
            this.selectedLevel = player.level || 'Easy';
        });      
    }
    
    startGame() {
        this._Store.dispatch(cancelRound({roundCanceled: false}));
        this._Store.dispatch( resetStateOnCancel() );
        this._Store.dispatch(createPlayerInfo({name: this.username, level: this.selectedLevel, newPlayer: false }));
        this._Store.dispatch(ChangeSpinnerVisability({ isVisiable: true }));
        this._Store.dispatch(gameStarted({gameStarted: true}));
        this._Router.navigate(['gameBoard']);
    }

    ngOnDestroy(){
        if(this.subscription) this.subscription.unsubscribe();
    }

}

