import { Routes } from '@angular/router';

export const routes: Routes =
    [
        {
            path: '',
            redirectTo: '/home',
            pathMatch: 'full'
        },
        {
            path: 'home',
            loadComponent: () => import('./pages/home/home').then(m => m.Home)
        },
        {
            path: 'auth',
            loadComponent: () => import('./pages/auth/auth').then(m => m.Auth)
        },
        {
            path: 'about',
            loadComponent: () => import('./pages/about/about').then(m => m.About)
        },
        {
            path: 'ahorcado',
            loadComponent: () => import('./pages/games/ahorcado/ahorcado').then(m => m.Ahorcado)
        },
        {
            path: 'mayor-menor',
            loadComponent: () => import('./pages/games/mayor-o-menor/mayor-o-menor').then(m => m.MayorOMenor)
        },
        {
            path: 'preguntados',
            loadComponent: () => import('./pages/games/preguntados/preguntados').then(m => m.Preguntados)
        },
        {
            path: 'eltesoroescondido',
            loadComponent: () => import('./pages/games/el-tesoro-escondido/el-tesoro-escondido').then(m => m.ElTesoroEscondido)
        },
        {
            path: "**",
            loadComponent: () => import('./pages/auth/auth').then(m => m.Auth)
        }
    ];
