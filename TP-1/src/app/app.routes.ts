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
            path: "**",
            loadComponent: () => import('./pages/auth/auth').then(m => m.Auth)
        }
    ];
