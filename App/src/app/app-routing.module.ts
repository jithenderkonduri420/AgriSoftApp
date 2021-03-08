import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./_pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'quick-pay',
    loadChildren: () => import('./_pages/quick-pay/quick-pay.module').then( m => m.QuickPayPageModule)
  },
  {
    path: 'crates-details',
    loadChildren: () => import('./_pages/crates-details/crates-details.module').then( m => m.CratesDetailsPageModule)
  },
  {
    path: 'order-now',
    loadChildren: () => import('./_pages/order-now/order-now.module').then( m => m.OrderNowPageModule)
  },
  {
    path: 'call-admin',
    loadChildren: () => import('./_pages/call-admin/call-admin.module').then( m => m.CallAdminPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
