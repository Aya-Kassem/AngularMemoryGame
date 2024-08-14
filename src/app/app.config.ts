import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { playerInfoReducer } from './Shared/Store/Player/player.reducer';
import { PlayerEffects } from './Shared/Store/Player/player.effects';
import { spinnerVisiabliltyReducer } from './Shared/Store/Spinner/spinner.reducer';
import { gameReducer } from './Shared/Store/Game/game.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withHashLocation()),
        provideAnimations(),
        provideStore({
            'PlayerInfo': playerInfoReducer,
            'ChangeSpinnerVisability': spinnerVisiabliltyReducer,
            'GameInfo': gameReducer
        }),
        provideEffects([
            PlayerEffects
        ])
    ]
};
