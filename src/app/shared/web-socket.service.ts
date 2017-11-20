import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WebSocketService {
  ws: WebSocket;
  constructor() { }
  /*创建一个可观察的websocket流*/
  createObservableSocket(url: string, pid: number): Observable<any> {
    this.ws = new WebSocket(url);
    return new Observable<string>(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        /*当websocket连接启动时，发送一条消息，消息内容是一个对象*/
        this.ws.onopen = (event) => this.sendMessage({productId: pid});
        /*取消订阅时会调用下面return的函数*/
        return () => this.ws.close();
      }
    ).map(message => JSON.parse(message));
  }
  /*发送消息*/
  sendMessage(message: any) {
    /*发送的参数转化为字符串*/
    this.ws.send(JSON.stringify(message));
  }

}
