import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'users-interaction',
    loadChildren: () => import('./users-interaction/users-interaction.module').then( m => m.UsersInteractionPageModule)
  },
  {
    path: 'users-interaction',
    loadChildren: () => import('./users-interaction/users-interaction.module').then( m => m.UsersInteractionPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
