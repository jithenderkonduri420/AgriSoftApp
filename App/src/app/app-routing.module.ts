import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./screens/home/home.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./screens/login/login.module').then( m => m.LoginPageModule)
   },
  {
    path: 'splash',
    loadChildren: () => import('./screens/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./screens/changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
