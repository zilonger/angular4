import {EventEmitter, Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  /*searchEvent作为中间人*/
  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  /*ws: WebSocket;
  /!*创建一个可观察的websocket流*!/
  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
      }
    );
  }
  /!*发送消息*!/
  sendMessage(message: string) {
    this.ws.send(message);
  }*/

  constructor(private http: Http) { }

  /*获取分类信息*/
  getAllCategories(): string[] {
    return ['angular', 'js框架', '前端开发'];
  }

  getProducts(): Observable<Product[]> {
    return this.http.get('/api/products').map(res => res.json());
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get('/api/product/' + id).map(res => res.json());
  }
  getCommentsForProductId(id: number): Observable<Comment[]> {
    return this.http.get('/api/product/' + id + '/comments').map(res => res.json());
  }
  /*搜索商品方法(带参数)*/
  searchProducts(params: ProductSearchParams): Observable<Product[]> {
    /*console.log(params);*/
    return this.http.get('/api/products', {search: this.encodeParams(params)}).map(res => res.json());
  }

  private encodeParams(params: ProductSearchParams) {
    /*keys方法把传入的对象的所有key值，取出来组成一个对象
    * append方法生成url参数，参数1: 参数名，参数2: 参数值
    * 注意：URLSearchParams从angular的http模块引入
    * */
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((urlSearchParams: URLSearchParams, key: string) => {
        /*console.log(key + ', ' + params[key]);*/
        urlSearchParams.append(key, params[key]);
        return urlSearchParams;
      }, new URLSearchParams());
  }
}

/*搜索参数类*/
export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) {}
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
