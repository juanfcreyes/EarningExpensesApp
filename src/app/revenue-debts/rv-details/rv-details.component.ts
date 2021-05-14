import { RevenueDebts } from './../../models/revenue-debts.model';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-rv-details',
  templateUrl: './rv-details.component.html',
})

export class RVDetailsComponent implements OnInit, OnChanges {

  @Input() title: string = '';
  @Input() items: RevenueDebts[] = [];
  total: Number = 0;

  constructor() { }
  ngOnChanges( _: SimpleChanges): void {
    this.total = this.items.reduce( (total, item) => total + item.amount, 0);
     console.log('ngOnChanges', _ );
  }

  ngOnInit(): void {
    this.total = this.items.reduce( (total, item) => total + item.amount, 0);
    console.log('ngOnInit', this.title, this.items, this.total );
  }



  deleteItem(item) {
    console.log(item);
  }

  cubrirItem(item) {

  }

}
