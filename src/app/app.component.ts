import { Component, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameIntroComponent } from './Components/game-intro/game-intro.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChangeSpinnerVisability } from './Shared/Store/Spinner/spinner.actions';
import { GameBoardComponent } from './Components/game-board/game-board.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, GameIntroComponent, SpinnerComponent, CommonModule, GameBoardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'memoryGame';
    flag$!: Observable<boolean> ;

    constructor(private _Store: Store<{ 'ChangeSpinnerVisability': boolean }>) {}
    ngOnInit() {
        console.log('Parent Component Initalizes!');
        this._Store.dispatch(ChangeSpinnerVisability({ isVisiable: true }));
        this.flag$ = this._Store.select('ChangeSpinnerVisability');
        this.flag$.subscribe();
    }

}
