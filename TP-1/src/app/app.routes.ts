import { Routes } from '@angular/router';

export const routes: Routes = 
[
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        loadComponent: () => import('./pages/login/login').then(m => m.Login) 
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    { 
        path: 'registro', 
        loadComponent: () => import('./pages/registro/registro').then(m => m.Registro) 
    },
    { 
        path: 'about', 
        loadComponent: () => import('./pages/about/about').then(m => m.About) 
    },
    {
        path: "**",
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    }
];
