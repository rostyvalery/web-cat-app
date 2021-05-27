export enum ProductActionTypes {
  "GET_ALL_PRODUCTS"="[Product] Get All Products",
  "GET_SELECTED_PRODUCTS"="[Product] Get Selected Products",
  "GET_AVAILABLE_PRODUCTS"="[Product] Get Available Products",
  "SEARCH_PRODUCTS"="[Product] Get Search Products",
  "NEW_PRODUCT"="[Product] New Products",
  "SELECT_PRODUCT"="[Product] Select Products",
  "EDIT_PRODUCT"="[Product] Edit Products",
  "DELETE_PRODUCT"="[Product] Delete Products",
  "PRODUCT_ADDED"="[Product] Products Added",
  "PRODUCT_UPDATED"="[Product] Products Updated",
}

export interface ActionEvent {
  type: ProductActionTypes,
  payload?: any
}

export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR
}

export interface AppDataState<T> {
  dataState? : DataStateEnum;
  data?: T,
  errorMessage?:string
}
