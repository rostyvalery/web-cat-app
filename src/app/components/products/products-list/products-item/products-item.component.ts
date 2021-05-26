import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../../model/product.model";
import {ActionEvent, ProductActionTypes} from "../../../../state/product.state";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit {

  @Input() product:Product|null=null;
  @Output() eventEmitter:EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.eventEmitter.emit({type:ProductActionTypes.SELECT_PRODUCT,payload:product});
  }

  onDelete(product: Product) {
    this.eventEmitter.emit({type:ProductActionTypes.DELETE_PRODUCT,payload:product});
  }

  onEdit(product: Product) {
    this.eventEmitter.emit({type:ProductActionTypes.EDIT_PRODUCT,payload:product});
  }
}
