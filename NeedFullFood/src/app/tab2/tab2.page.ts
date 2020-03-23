import { Component, OnInit } from '@angular/core';
import { FrigoService } from '../services/frigo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  qrResultString: string;

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  constructor(
    private frigoService: FrigoService
  ) {}

  ngOnInit() {
  }

  async createProduct(){
    // Usa queste per creare uno spinner di caricamento
    // che dice "Sto creando l'elemento"
    //this.isLoading = true;
    console.log("Sto creando l'elemeno");
    let result = await this.frigoService.createProduct(this.qrResultString);
    console.log(result);
    //this.isLoading = false;
  }

}
