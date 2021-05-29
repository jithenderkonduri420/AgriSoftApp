import { RoleGuard } from './../../guards/role.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canActivate: [RoleGuard, AuthGuard]
      },
      {
        path: 'cart',
        loadChildren: () => import('../cart/cart.module').then(m => m.CartPageModule),
        canActivate: [RoleGuard, AuthGuard]
      },
      {
        path: 'order',
        loadChildren: () => import('../order/order.module').then(m => m.OrderPageModule),
        canActivate: [RoleGuard, AuthGuard]
      },
      {
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule),
        canActivate: [RoleGuard, AuthGuard]
      },
      {
        path: '',
        redirectTo: '/home/dashboard',
        pathMatch: 'full'
      },

    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomePageRoutingModule {}
