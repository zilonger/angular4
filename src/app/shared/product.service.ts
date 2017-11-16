import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  products: Product[] = [
    new Product(1, '我的商品一', 19.98, 3.8, '这是第一个被创建的商品！', ['angular', 'ts']),
    new Product(2, '我的商品二', 13.38, 4.8, '这是第二个被创建的商品！', ['angularjs']),
    new Product(3, '我的商品三', 9.98, 2.8, '这是第三个被创建的商品！', ['java', 'js']),
    new Product(4, '我的商品四', 39.28, 3.5, '这是第四个被创建的商品！', ['js']),
    new Product(5, '我的商品五', 29.98, 3.0, '这是第五个被创建的商品！', ['web']),
    new Product(6, '我的商品六', 19.00, 3.2, '这是第六个被创建的商品！', ['前端开发']),
    new Product(7, '我的商品七', 19.55, 4.4, '这是第七个被创建的商品！', ['angular', '后端']),
    new Product(8, '我的商品八', 9.9, 2.5, '这是第八个被创建的商品！', ['angular', 'nodejs']),
  ];

  comments: Comment[] = [
    new Comment(1, 1, '2017-11-7 16:52', '赵龙', 3.5, '还可以哦，不错！'),
    new Comment(2, 1, '2017-11-7 16:52', '赵龙', 2.5, '还可以哦，不错！'),
    new Comment(3, 2, '2017-11-7 16:52', '赵龙', 3.5, '还可以不错！'),
    new Comment(4, 2, '2017-11-7 16:52', '小龙', 3, '还可以哦，不错！'),
    new Comment(5, 3, '2017-11-7 16:52', '赵龙', 3.5, '可以哦，不错！'),
    new Comment(6, 3, '2017-11-7 16:52', '赵龙', 1.5, '还可以哦，不错！'),
  ];

  constructor() { }

  /*获取分类信息*/
  getAllCategories(): string[] {
    return ['电子产品', '硬件设备', '图书'];
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find((product) => product.id === id);
  }
  getCommentsForProductId(id: number): Comment[] {
    return this.comments.filter((comment) => comment.productId === id);
  }

}

/*描述产品信息类*/
export class Product {
  constructor(
    public id: number,
    public title: String,
    public price: number,
    public rating: number,
    public desc: String,
    public categories: Array<string>
  ) {}
}

/*描述评论信息的类*/
export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public comment: string
  ) {}
}
