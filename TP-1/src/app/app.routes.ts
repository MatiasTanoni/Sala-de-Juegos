import { Routes } from '@angular/router';
import { guardsGuard } from './guards/guards-guard';

export const routes: Routes = [
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

    // Rutas protegidas por el guard
    {
        path: 'ahorcado',
        loadComponent: () => import('./pages/games/ahorcado/ahorcado').then(m => m.Ahorcado),
        canActivate: [guardsGuard]
    },
    {
        path: 'mayor-menor',
        loadComponent: () => import('./pages/games/mayor-o-menor/mayor-o-menor').then(m => m.MayorOMenor),
        canActivate: [guardsGuard]
    },
    {
        path: 'preguntados',
        loadComponent: () => import('./pages/games/preguntados/preguntados').then(m => m.Preguntados),
        canActivate: [guardsGuard]
    },
    {
        path: 'el-tesoro-escondido',
        loadComponent: () => import('./pages/games/el-tesoro-escondido/el-tesoro-escondido').then(m => m.ElTesoroEscondido),
        canActivate: [guardsGuard]
    },
    {
        path: 'chat',
        loadComponent: () => import('./pages/chat/chat').then(m => m.Chat),
        canActivate: [guardsGuard]
    },

    // Ruta comodín (si no encuentra ninguna ruta)
    {
        path: '**',
        loadComponent: () => import('./pages/auth/auth').then(m => m.Auth)
    }
];
