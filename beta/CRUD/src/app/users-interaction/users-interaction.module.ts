import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersInteractionPageRoutingModule } from './users-interaction-routing.module';

import { UsersInteractionPage } from './users-interaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersInteractionPageRoutingModule
  ],
  declarations: [UsersInteractionPage]
})
export class UsersInteractionPageModule {}
