import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Comment, Product, ProductService} from '../shared/product.service';
import {WebSocketService} from '../shared/web-socket.service';
import {Subscription} from 'rxjs/Subscription';

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

  isWatched = false; /*是否关注*/
  currentBid: number; /*当前出价*/

  /*保存一个订阅的返回值*/
  subscription: Subscription;

  constructor(
    private routeInfo: ActivatedRoute,
    private productService: ProductService,
    private wsService: WebSocketService
  ) { }

  ngOnInit() {
    const productId = this.routeInfo.snapshot.params['productId'];
    this.productService.getProduct(+productId).subscribe(
      product => {
        this.product = product;
        this.currentBid = product.price;
      }
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

  /*关注方法*/
  watchProduct() {
    /*如果订阅存在，说明已订阅，则 取消订阅 并将subscription设为空*/
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
    } else {
      this.isWatched = true;
      this.subscription = this.wsService.createObservableSocket('ws://localhost:8085', this.product.id)
        .subscribe(
          products => {
            /*过滤出当前商品*/
            const currentProduct = products.find(p => p.productId === this.product.id);
            /*设置当前商品的出价*/
            this.currentBid = currentProduct.bid;
          }
        );
    }
  }
}
