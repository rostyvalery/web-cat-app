import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.model';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionTypes} from '../../state/product.state';
import {Router} from "@angular/router";
import {EventDriverService} from "../../state/event.driver.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //products:Product[]|null = null;
  products$:Observable<AppDataState<Product[]>>|null=null;
  readonly DataStateEnum = DataStateEnum;

  constructor(private productsService:ProductsService, private router:Router,
              private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.onActionEvent(actionEvent);
    });
  }

  /*onGetAllProducts(){
    this.productsService.getAllProducts().subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })
  }*/

  onGetAllProducts(){

      this.products$=this.productsService.getAllProducts().pipe(
          map(data=>{
              console.log(data);
              return ({dataState:DataStateEnum.LOADED, data:data})
          }),
          startWith({dataState:DataStateEnum.LOADING}),
          catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onGetAvailableProducts(){
      this.products$=this.productsService.getAvailableProducts().pipe(
          map(data=>{
              console.log(data);
              return ({dataState:DataStateEnum.LOADED, data:data})
          }),
          startWith({dataState:DataStateEnum.LOADING}),
          catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onGetSelectedProducts(){
      this.products$=this.productsService.getSelectedProducts().pipe(
          map(data=>{
              console.log(data);
              return ({dataState:DataStateEnum.LOADED, data:data})
          }),
          startWith({dataState:DataStateEnum.LOADING}),
          catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
      );
  }

  onSearch(dataForm:any){
        this.products$=this.productsService.searchProducts(dataForm.keyword).pipe(
            map(data=>{
                console.log(data);
                return ({dataState:DataStateEnum.LOADED, data:data})
            }),
            startWith({dataState:DataStateEnum.LOADING}),
            catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
        );
   }

  onSelect(p:Product){
    this.productsService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onDelete(p:Product){
    let v=confirm("Etes-vous sur de vouloir supprimer?");
    if(v==true)
      this.productsService.delete(p)
        .subscribe(data=>{
          this.onGetAllProducts();
        })
  }

  onNewProduct() {
    this.router.navigateByUrl("/newProduct");
  }

  onEdit(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionTypes.GET_ALL_PRODUCTS:this.onGetAllProducts();break;
      case ProductActionTypes.GET_SELECTED_PRODUCTS:this.onGetSelectedProducts();break;
      case ProductActionTypes.GET_AVAILABLE_PRODUCTS:this.onGetAvailableProducts();break;
      case ProductActionTypes.SEARCH_PRODUCTS:this.onSearch($event.payload);break;
      case ProductActionTypes.NEW_PRODUCT:this.onNewProduct();break;
      case ProductActionTypes.SELECT_PRODUCT:this.onSelect($event.payload);break;
      case ProductActionTypes.DELETE_PRODUCT:this.onDelete($event.payload);break;
      case ProductActionTypes.EDIT_PRODUCT:this.onEdit($event.payload);break;
    }
  }
}
