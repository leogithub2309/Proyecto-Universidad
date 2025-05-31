import { Routes } from '@angular/router';
import { userTokenGuard } from './guards/user-token.guard';
import { authUserGuard } from './guards/auth-user.guard';

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
    canMatch: [authUserGuard],
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
     canMatch: [authUserGuard],
    path: 'ventas',
    loadComponent: () => import('./pages/ventas/ventas.page').then( m => m.VentasPage)
  },
  {
    canMatch: [authUserGuard],
    path: 'compras',
    loadComponent: () => import('./pages/compras/compras.page').then( m => m.ComprasPage)
  },
  {
    canMatch: [authUserGuard],
    path: 'all-sales',
    loadComponent: () => import('./pages/all-sales/all-sales.page').then( m => m.AllSalesPage)
  },
  {
    canMatch: [authUserGuard],
    path: 'ventas-details/:id',
    loadComponent: () => import('./pages/ventas-details/ventas-details.page').then( m => m.VentasDetailsPage)
  },  {
    path: 'all-solds',
    loadComponent: () => import('./pages/all-solds/all-solds.page').then( m => m.AllSoldsPage)
  },



];
