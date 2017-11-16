import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  formModel: FormGroup;

  categories: string[];

  constructor(private productService: ProductService) {
    const formBuilder = new FormBuilder();
    this.formModel = formBuilder.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  /*正数校验
  * ??这里发生了一个问题 输入0000的时候校验通过的，而且最后提交的值price=0;(可能是发生了数据转换)
  * */
  positiveNumberValidator(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const price = parseInt(control.value);
    console.log(price);

    if (price > 0) {
      return null;
    } else {
      return {positiveNumber: true};
    }
  }

  onSearch() {
    if (this.formModel.valid) {
      alert('表单验证通过');
      console.log(this.formModel.value);
    }
  }

}
