import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from './shared/guard/route.guard';

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    redirectTo: 'user'
  },
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  { 
    path: 'user', 
    canActivate: [RouteGuard], 
    loadChildren: () => import('./user/user.module').then(m => m.UserModule) 
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
