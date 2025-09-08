import { Routes } from '@angular/router';

export const routes: Routes = 
[
    { 
        path: '', 
        redirectTo: '/auth', 
        pathMatch: 'full' 
    },
    { 
        path: 'auth', 
        loadComponent: () => import('./pages/auth/auth').then(m => m.Auth) 
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
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
