import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then((m) => m.RegisterPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'ventas',
    loadComponent: () => import('./pages/ventas/ventas.page').then( m => m.VentasPage)
  },
  {
    path: 'compras',
    loadComponent: () => import('./pages/compras/compras.page').then( m => m.ComprasPage)
  },
];
