import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { gameInfo, Info } from './intro.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'gameIntro',
  standalone: true,
  imports: [
    CarouselModule, 
    ButtonModule, 
    DropdownModule, 
    FormsModule,
    ReactiveFormsModule ],
  templateUrl: './game-intro.component.html',
  styleUrl: './game-intro.component.scss'
})
export class GameIntroComponent {
  gameInfo: gameInfo[] = Info;
  responsiveOptions: any[] | undefined;
  // gameStarted: boolean = true;
  gameStarted: boolean = false;
  pageNumber!: Number;

  levels: String[] = ['Easy, Medium', 'Hard'];
  selectedLevel!: String;

  constructor() { }
  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  startGame() {
    this.gameStarted = true;
  }

  onSlidesEnded(i: number){
    this.pageNumber = i;
  }

  prepareBoard(){
    this.gameStarted = !this.gameStarted;
  }
}
