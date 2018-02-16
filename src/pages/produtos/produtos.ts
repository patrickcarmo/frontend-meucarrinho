import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ProdutoDTO } from './../../models/produto.dto';
import { ProdutoService } from './../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoriaId = this.navParams.get('categoriaId');
    let loader = this.presentLoading();
    let start, end;
    this.produtoService.findByCategoria(categoriaId, this.page, 10)
      .subscribe(response => {
        start = this.items.length;
        this.items = this.items.concat(response['content']);
        end = this.items.length - 1;
        loader.dismiss();
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      }
    );
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {}
        );
    }
  }

  showDetail(produtoId: String) {
    this.navCtrl.push('ProdutoDetailPage', {produtoId: produtoId});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde..'
    });
    loader.present();
    return loader;
  }


  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    },1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    },1000);
  }

}
