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
  },
  {
    canMatch: [authUserGuard],
    path: 'all-solds',
    loadComponent: () => import('./pages/all-solds/all-solds.page').then( m => m.AllSoldsPage)
  },
  {
    canMatch: [authUserGuard],
    path: 'add-inventario',
    loadComponent: () => import('./pages/add-inventario/add-inventario.page').then( m => m.AddInventarioPage)
  },
  {
    canMatch: [authUserGuard],
    path: 'compras-details/:id',
    loadComponent: () => import('./pages/compras-details/compras-details.page').then( m => m.ComprasDetailsPage)
  },
  {
    path: 'edit-venta/:id',
    loadComponent: () => import('./pages/edit-venta/edit-venta.page').then( m => m.EditVentaPage)
  },
  {
    path: 'edit-compra/:id',
    loadComponent: () => import('./pages/edit-compra/edit-compra.page').then( m => m.EditCompraPage)
  },
  {
    canActivate: [userTokenGuard],
    path: 'admin-users-page',
    loadComponent: () => import('./pages/admin-users-page/admin-users-page.page').then( m => m.AdminUsersPagePage)
  },





];
