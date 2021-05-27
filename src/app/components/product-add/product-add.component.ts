import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products.service";
import {EventDriverService} from "../../state/event.driver.service";
import {ProductActionTypes} from "../../state/product.state";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productFormGroup=this.fb.group({
    name:["",Validators.required],
    price:[0,Validators.required],
    quantity:[0,Validators.required],
    selected:[true,Validators.required],
    available:[true,Validators.required]
  });
  submitted:boolean=false;

  constructor(private fb:FormBuilder, private productsService:ProductsService,
              private eventDriverService:EventDriverService) { }

  ngOnInit(): void {

  }

  onSaveProduct() {
    this.submitted=true;
    if(this.productFormGroup.invalid) return;
    this.productsService.save(this.productFormGroup.value)
      .subscribe(data=>{
        this.eventDriverService.publishEvent({type:ProductActionTypes.PRODUCT_ADDED})
        alert("Success saving product ...")
      })
  }
}
