import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab2Page } from './tab2.page';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    FormsModule,
    IonicModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
