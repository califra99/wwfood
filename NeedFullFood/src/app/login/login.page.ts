import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
 
@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
	validationsForm: FormGroup;
	errorMessage: string = '';
 
	validationMessages = {
		'email': [
			{ type: 'required', message: 'Email is required.' },
			{ type: 'pattern', message: 'Please enter a valid email.' }
		],
		'password': [
			{ type: 'required', message: 'Password is required.' },
			{ type: 'minlength', message: 'Password must be at least 5 characters long.' }
		]
	};

	constructor(
		private navCtrl: NavController,
		private authService: AuthenticateService,
		private formBuilder: FormBuilder
	) { }
 
	ngOnInit() {
		this.validationsForm = this.formBuilder.group({
			email:    new FormControl('', Validators.compose([ Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') ])),
			password: new FormControl('', Validators.compose([ Validators.minLength(5), Validators.required ])),
		});
	}
 
	login(value) {
		this.authService
			.login(value)
			.then(res => {
				console.log(res);
				this.errorMessage = '';
				this.navCtrl.navigateForward('/tabs');
			}, err => {
				this.errorMessage = err.message;
			})
	}
 
	goToRegisterPage(){
		this.navCtrl.navigateForward('/register');
	}
 
}