import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../shared/product.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  /*该products属性是流，通过模板上的异步管道 async 自动订阅流*/
  public products: Observable<Product[]>;

  imgUrl = 'http://placehold.it/320x150';

  /*搜素关键字*/
  keyWord: string;

  titleFilter: FormControl = new FormControl();

  constructor(private productService: ProductService) {
  }

  /*组件实例化后调用一次*/
  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.searchProducts(params)
    );
  }

}
