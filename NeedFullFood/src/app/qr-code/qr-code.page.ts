import { Component, OnInit } from '@angular/core';
import { FrigoService } from '../services/frigo.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  qrResultString: string;
  title: string;
  date: number;
  isFinished:boolean;

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString; 
    
    let newProduct = JSON.parse(this.qrResultString);

    this.title = newProduct.title;
    this.date = newProduct.expire_date;
  }

  constructor(
    private frigoService: FrigoService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
  }


  
  async createProduct(){
    // Usa queste per creare uno spinner di caricamento
    // che dice "Sto creando l'elemento"
    this.isFinished = false;
    console.log("Sto creando l'elemeno");
    let result = await this.frigoService.createProduct(this.qrResultString);
    console.log(result);
    this.isFinished = true;
  }

  goToTuoFrigo(){
    this.navCtrl.navigateForward('/tabs/tab1');
  }

  goBack(){
    this.navCtrl.navigateForward('/tabs/tab2');
  }

}
