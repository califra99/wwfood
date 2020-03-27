import { Component } from '@angular/core';
import { CalendarView } from 'angular-calendar';

import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

import { Observable } from 'rxjs';
import { Frigo } from '../../models/frigo';
import { FrigoService } from '../services/frigo.service';

import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  view: CalendarView = CalendarView.Day;
	CalendarView = CalendarView;
  viewDate: Date = new Date();

  userEmail: string;
  private frigos: Frigo[];

  constructor(
    private navCtrl: NavController,
		private authService: AuthenticateService,
		private frigoService: FrigoService,
  ) {}

  ngOnInit() {
		console.log('init');
		if ( this.authService.userDetails() ) {
			this.userEmail = this.authService.userDetails().email;
		}else{
			this.navCtrl.navigateBack('');
    }

    this.loadItems();
  }

  loadItems() {
    this.frigos = this.frigoService.getFrigosbyDate(this.viewDate);
  }
  
  


  delete(slidingProduct: IonItemSliding, frigo: any) {
    this.frigoService.deleteFrigo( frigo.id ).then(() => {
      this.loadItems();
        console.log('Product cancellato');
    }, err => {
        console.log('Problema nel cancellare il product');
    });
    slidingProduct.close();
}

logout() {
  this.authService
    .logout()
    .then(res => {
      console.log(res);
      this.frigos = null;
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
}

}
