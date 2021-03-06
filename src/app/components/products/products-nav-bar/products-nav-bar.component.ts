import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {outputPath} from "@angular-devkit/build-angular/src/test-utils";
import {ActionEvent, ProductActionTypes} from "../../../state/product.state";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  @Output() productEvenEmitter:EventEmitter<ActionEvent> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    this.productEvenEmitter.emit({type:ProductActionTypes.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
    this.productEvenEmitter.emit({type:ProductActionTypes.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    this.productEvenEmitter.emit({type:ProductActionTypes.GET_AVAILABLE_PRODUCTS});
  }

  onNewProduct() {
    this.productEvenEmitter.emit({type:ProductActionTypes.NEW_PRODUCT});
  }

  onSearch(dataForm: any) {
    this.productEvenEmitter.emit({type:ProductActionTypes.SEARCH_PRODUCTS,payload:dataForm});
  }
}
