import { Component, OnInit } from '@angular/core';
import { FrigoService } from '../services/frigo.service';

import { Dialogs } from '@ionic-native/dialogs/ngx';
import { AlertController } from '@ionic/angular';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  

  constructor(
		private frigoService: FrigoService,
		public dialogs: Dialogs,
		public alertCtrl: AlertController,
		private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  public addItem() {
		this.dialogs.prompt('Aggiungi un item', 'ionic2do', ['OK', 'Annulla'], '')
			.then(result => {
				if ( result.buttonIndex == 1 && result.input1 !== '' ) {
					this.frigoService.addFrigo( { title: result.input1, expired_date: "" } );
				}
			});

			if ( window.cordova ) {
				// Native Dialog
			} else {
				this.addItemNoNative();
			}

	}

	
	async addItemNoNative() {

		const prompt = await this.alertCtrl.create({
			header: 'Il tuo frigorifero',
			message: "Aggiungi un prodotto e la data di scadenza",
			inputs: [
				{
					name: 'title',
					placeholder: 'title'
				},
				{
					name: 'date',
					placeholder: 'date',
					type: 'date'
				},
			],
			
			buttons: [{
				text: 'Annulla',
			}, {
				text: 'Add',
				handler: data => {
					let expired_date = Math.round((new Date(data.date)).getTime() / 1000);
					this.frigoService.addFrigo( {
						title: data.title,
						expired_date: expired_date
					});
			
				}
			}]  
		});

		await prompt.present();
	}

	
	goToQrCodePage(){
		this.navCtrl.navigateForward('/qr-code');
	}

}
