import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {
  @Input() rating = 0;
  /*必须命名为rating+Change 才能使用双向绑定指令
  * 否则要在product-detail组件中使用事件绑定(ratingChange)="handleFunction()" 在函数中改变newRating的值
  * */
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  stars: boolean[];
  @Input() readonly = true;

  constructor() {
  }

  ngOnInit() {
    /*将星级rating与1到5的数值相比，push进对应的星级*/
    /*this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }*/
  }
  /*输入属性改变时，该钩子被调用*/
  ngOnChanges(changes: SimpleChanges): void {
    /*重新设置星级*/
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }

  clickStar(index: number): void {
    if (!this.readonly) {
      this.rating = index + 1;
      /*重新调用ngOnInit*/
      /*this.ngOnInit();*/
      /*将新的rating值发射出去*/
      this.ratingChange.emit(this.rating);
    }
  }

}
