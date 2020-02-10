import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
 
import { Observable } from 'rxjs';
import { Frigo } from '../../models/frigo';
import { FrigoService } from '../services/frigo.service';

import { Dialogs } from '@ionic-native/dialogs/ngx';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 
	userEmail: string;
	private frigos: Observable<Frigo[]>;

	constructor(
		private navCtrl: NavController,
		private authService: AuthenticateService,
		private frigoService: FrigoService,
		public dialogs: Dialogs,
		public alertCtrl: AlertController,
	) {
		
	}

	ngOnInit() {
		console.log('init');
		if ( this.authService.userDetails() ) {
			this.userEmail = this.authService.userDetails().email;
		}else{
			this.navCtrl.navigateBack('');
		}

		this.frigos = this.frigoService.getFrigos();

/*		let f = {
			title: 'test con data',
			expired_date: moment().unix()
		};
		this.frigoService.addFrigo(f);*/
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
					placeholder: 'date'
				},
			],
			
			buttons: [{
				text: 'Annulla',
				handler: data => {
					console.log('Annulla cliccato');
				}
			}, {
				text: 'Add',
				handler: data => {
					this.frigoService.addFrigo( {
						title: data.title,
						expired_date: data.date
					});
				}
			}]  
		});

		await prompt.present();
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