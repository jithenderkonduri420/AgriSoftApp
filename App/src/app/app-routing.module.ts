import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./screens/home/home.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./screens/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'changepassword',
    loadChildren: () =>
      import('./screens/changepassword/changepassword.module').then(
        (m) => m.ChangepasswordPageModule
      ),
  },
  {
    path: 'order',
    loadChildren: () => import('./screens/order/order-routing.module').then( m => m.OrderPageRoutingModule)
  },
  {
    path: 'deliveryboy',
    loadChildren: () =>
      import('./screens/deliveryboy/deliveryboy.module').then(
        (m) => m.DeliveryboyPageModule
      ),
      canActivate: [ AuthGuard]
  },
  {
    path: 'deliveryboy-ionvice/:id',
    loadChildren: () =>
      import('./screens/deliveryboy-ionvice/deliveryboy-ionvice.module').then(
        (m) => m.DeliveryboyIonvicePageModule
      ),
      canActivate: [ AuthGuard]
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
