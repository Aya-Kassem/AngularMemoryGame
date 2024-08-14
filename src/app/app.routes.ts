import { Routes } from '@angular/router';
import { GameBoardComponent } from './Core/Game/game-board/game-board.component';
import { GameIntroComponent } from './Core/Game/game-intro/game-intro.component';
import { NotFoundComponent } from './Core/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'gameIntro', pathMatch: 'full' },
    {
        path: 'gameIntro',
        loadComponent: () => import('./Core/Game/game-intro/game-intro.component').then((c) => c.GameIntroComponent)
    },
    {
        path: 'gameBoard',
        loadComponent: () => import('./Core/Game/game-board/game-board.component').then((c) => c.GameBoardComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./Core/not-found/not-found.component').then((c) => c.NotFoundComponent)
    }
];
