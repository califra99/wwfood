import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Tab3Page } from './tab3.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    FormsModule,
    IonicModule,
    ZXingScannerModule,
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
