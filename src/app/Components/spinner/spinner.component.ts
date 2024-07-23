import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../../Shared/Store/User/user.state';

@Component({
    selector: 'spinner',
    standalone: true,
    imports: [],
    templateUrl: './spinner.component.html',
      styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
    userExist!: boolean;
    constructor(private _Store: Store<{ 'UserInfo': User }>) { }
    ngOnInit() {
        console.log('Spinner init');
        this._Store.select('UserInfo').subscribe((user) => {
            this.userExist = user.name ? true : false
        })
    }
}
