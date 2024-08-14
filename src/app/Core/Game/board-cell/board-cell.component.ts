import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player } from '../../../Shared/Store/Player/player.state';
import { CommonModule } from '@angular/common';
import { ImagesService } from '../Shared/Images/images.service';
import { ImageInterface } from '../Shared/Images/images.interface';
import { Game } from '../../../Shared/Store/Game/game.state';
import { calcMovesLeft, checkFlippedCardsNum, decreaseNumOfFlippedCards, mismatchMoves, playerMoves, terminateRound } from '../../../Shared/Store/Game/game.actions';

@Component({
    selector: 'boardCell',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './board-cell.component.html',
    styleUrl: './board-cell.component.scss',
    providers: [ImagesService]
})

export class BoardCellComponent {
    levelImages!: ImageInterface[];
    level!: string;
    numberOfLevelCards!: number;
    firstImageDataAttribute!: string;
    secondImageDataAttribute!: string;
    firstCard!: HTMLElement | null;
    secondCard!: HTMLElement | null;
    playerInfo$: Observable<Player> = this._Store.select('PlayerInfo');
    numberOfFlippedCards: number = 0;
    allMoves: number = 0
    missedMoves: number = 0;
    allCards: number = 0;
    levelMoves!: number;
    imagesCountForLevel: { [key: string]: number } = {
        'Easy': 8,
        'Medium': 10,
        'Hard': 12
    };
    count!: number;

    constructor(
        private _Store: Store<{ 'PlayerInfo': Player, 'GameInfo': Game }>,
        private _ImageClass: ImagesService
    ) { }

    ngOnInit() {
        this.playerInfo$.subscribe((player) => {
            this.level = player.level;
            this.count = this.imagesCountForLevel[this.level];
        });
        this.levelImages = this._ImageClass.getImagesForLevel(this.count);
        this._Store.select('GameInfo').subscribe((info) => {
            this.numberOfFlippedCards = info.numOfFlippedCards;
            this.allMoves = info.moves;
            this.missedMoves = info.misses;
            this.allCards = info.levelCardsNumber;
            this.levelMoves = info.levelMoves
        })
    }

    checkIfImageMatching = (event: MouseEvent, card: HTMLElement, img: HTMLImageElement, audio: HTMLAudioElement ) => {
        card.classList.contains('match') || card.classList.contains('flipped') ? event.preventDefault() : (this.flipImage(card, img), this.playAudio(audio));
    };

    playAudio(audio: HTMLAudioElement){
        audio.play();
        audio.currentTime = 0;
    }

    flipImage = (card: HTMLElement, img: HTMLImageElement) => {
        if (this.numberOfFlippedCards < 2) {
            this._Store.dispatch(checkFlippedCardsNum({ cardsNum: ++this.numberOfFlippedCards }));

            card.classList.add('flipped');
            this.setCardsAndImagesElements(card, img)
        }
    }

    setCardsAndImagesElements = (card: HTMLElement, img: HTMLImageElement) => {
        const attr = img.getAttribute('data')!;
        this.numberOfFlippedCards == 1 ? this.setFirstImageCardElement(card, attr) : this.setSecondImageCardElement(card, attr)
    }

    setFirstImageCardElement = (card: HTMLElement, attr: string) => {
        this.firstCard = card;
        this.firstImageDataAttribute = attr;
    }

    setSecondImageCardElement = (card: HTMLElement, attr: string) => {
        this.secondCard = card;
        this.secondImageDataAttribute = attr;

        setTimeout(() => {
            this.calcPlayerMoves();
            this.terminateRoundWhenMovesEnded();
            this.checkMatchingResult();
        }, 900)
    }

    terminateRoundWhenMovesEnded() {
        this._Store.dispatch(calcMovesLeft({ movesLeft: (this.levelMoves - this.allMoves) }));
        if (this.allMoves == this.levelMoves) this._Store.dispatch(terminateRound({ roundTerminated: true, terminateReason: 'Out Of Moves!' }));
    }

    calcPlayerMoves() {
        this.allMoves++;
        this._Store.dispatch(playerMoves({ movesNum: this.allMoves }));
    }

    checkMatchingResult = () => {
        this.firstImageDataAttribute === this.secondImageDataAttribute ? this.matchingCards() : this.misMatchingCards();
    }

    matchingCards = () => {
        this.firstCard?.classList.add('match');
        this.secondCard?.classList.add('match');
        this._Store.dispatch(decreaseNumOfFlippedCards());
        this.resetAllVaraibles();
    }

    misMatchingCards = () => {
        this.missedMoves++;
        this.firstCard?.classList.remove('flipped');
        this.secondCard?.classList.remove('flipped');
        this._Store.dispatch(mismatchMoves({ mismatchMoves: this.missedMoves }))
        this.resetAllVaraibles();
    }

    resetAllVaraibles = () => {
        this.firstCard = null;
        this.secondCard = null;
        this.firstImageDataAttribute = '';
        this.secondImageDataAttribute = '';
        this._Store.dispatch(checkFlippedCardsNum({ cardsNum: 0 }));
    }
}

