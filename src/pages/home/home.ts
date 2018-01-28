import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

import { CredenciaisDTO } from './../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email : "",
    senha : ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false); //Desabilita o menu lateral quando for entrar na página.
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true); //Habilita o menu lateral quand for sair da página.
  }

  login() {
    //this.navCtrl.push('CategoriasPage'); //Empilha a página e habilita o botão voltar.
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage'); //Utiliza a pagina como principal, mostra o botão menu.
  }

}
