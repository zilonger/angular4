import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input() rating = 0;
  stars: boolean[];

  constructor() { }

  ngOnInit() {
    /*将星级rating与1到5的数值相比，push进对应的星级*/
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i > this.rating);
    }
  }

}
