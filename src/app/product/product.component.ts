import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from '../shared/product.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public products: Array<Product>;

  imgUrl = 'http://placehold.it/320x150';

  /*搜素关键字*/
  keyWord: string;

  titleFilter: FormControl = new FormControl();

  constructor(
    private productService: ProductService
  ) {
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyWord = value
      );
  }

  /*组件实例化后调用一次*/
  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}
