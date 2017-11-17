import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Comment, Product, ProductService} from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  /*productTitle: string;*/

  product: Product;

  /*评论信息*/
  comments: Comment[];

  /*新评论信息*/
  newRating = 5; /*默认5星*/
  newComment = '';
  isCommentHidden = true;

  constructor(
    private routeInfo: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const productId = this.routeInfo.snapshot.params['productId'];
    this.productService.getProduct(+productId).subscribe(
      product => this.product = product
    );
    this.productService.getCommentsForProductId(+productId).subscribe(
      comments => this.comments = comments
    );
    /*this.productTitle = this.routeInfo.snapshot.params['prodTitle'];*/
  }
  addComment(): void {
    const comment = new Comment(0, this.product.id, new Date().toISOString(), 'zilong', this.newRating, this.newComment);
    /*this.comments.push(comment);*/
    this.comments.unshift(comment);

    /*计算平均评分*/
    let sum = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
    this.product.rating = sum / this.comments.length;

    /*重置表单*/
    this.newRating = 5;
    this.newComment = '';
    this.isCommentHidden = true;
  }

}
