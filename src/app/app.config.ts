import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { spinnerVisiabliltyReducer } from './Shared/Store/Spinner/spinner.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { userInfoReducer } from './Shared/Store/User/user.reducers';
import { provideEffects } from '@ngrx/effects';
import { storeUserState } from './Shared/Store/User/user.actions';
import { UserEffects } from './Shared/Store/User/user.effects';


export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideRouter(routes),
        provideClientHydration(),
        provideStore(
            {
                'ChangeSpinnerVisability': spinnerVisiabliltyReducer,
                'UserInfo': userInfoReducer

            }),
            provideEffects(
                UserEffects
            )
        
        
        ]
};
