import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from '../Store/Game/game.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'spinner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './spinner.component.html',
      styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
    userExist!: boolean;
    gameInfo$ : Observable<Game> = this._Store.select('GameInfo');

    constructor(private _Store: Store<{ 'GameInfo': Game }>) { }
    ngOnInit() {
        console.log('Spinner init'); 
    }
}
