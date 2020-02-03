import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersInteractionPage } from './users-interaction.page';

const routes: Routes = [
  {
    path: '',
    component: UsersInteractionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersInteractionPageRoutingModule {}
