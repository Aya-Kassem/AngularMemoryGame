import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { gameInfo, Info } from './intro.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { Store } from '@ngrx/store';
import { ChangeSpinnerVisability } from '../../Shared/Store/Spinner/spinner.actions';
import { User } from '../../Shared/Store/User/user.state';
import { storeUserState, userInfoAvailable } from '../../Shared/Store/User/user.actions';

@Component({
    selector: 'gameIntro',
    standalone: true,
    imports: [
        CarouselModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule, SpinnerComponent],
    templateUrl: './game-intro.component.html',
    styleUrl: './game-intro.component.scss'
})

export class GameIntroComponent {
    gameInfo: gameInfo[] = Info;
    username!:string;
    levels: String[] = ['Easy', 'Medium', 'Hard'];
    selectedLevel: string = 'Easy';

    constructor(private _Store: Store<{ 'ChangeSpinnerVisability': boolean, 'UserInfo': User }>) {}

    ngOnInit() {
        console.log('Child Component Intializes!');
    }
    startGame() {
        this._Store.dispatch(userInfoAvailable({name: this.username, level: this.selectedLevel, newUser: true}));
        this._Store.dispatch(storeUserState());
    }

    ngAfterViewInit() {
        console.log('Child AfterViewInit');
        setTimeout(() => {
            this._Store.dispatch(ChangeSpinnerVisability({ isVisiable: false }));
        }, 2000);
    }
}

