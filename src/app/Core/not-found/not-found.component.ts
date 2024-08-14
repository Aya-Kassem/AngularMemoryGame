import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'notFound',
    standalone: true,
    imports: [],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
    constructor(private _Location: Location) { }
    ngOnInit(){
        console.log('Not Found Component Initailaize');  
    }
    
    backToGame() {
        this._Location.back()
    }
}
