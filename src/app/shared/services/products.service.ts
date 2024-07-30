import { Injectable } from '@angular/core';
import { Iproduct } from '../model/products';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  prodArr: Array<Iproduct>=[
    {
      pname:"Moto g30",
      pid:"123",
      pstatus:"In-Progress",
      canReturn : 0
    },
    {
      pname:"Realme g30",
      pid:"124",
      pstatus:"Dispatched",
      canReturn : 1
    },
    {
      pname:"Apple g30",
      pid:"125",
      pstatus:"Delivered",
      canReturn : 0
    }
  ]

  constructor(
    private _router  :Router,
    private _snackbar : SnackbarService
  ) { }

  fetchAllProds(){
    return this.prodArr
  }

  getProductDetails(id: string){
    return this.prodArr.find(prod=> prod.pid === id) as Iproduct
  }

  addProduct(product: Iproduct){
    this.prodArr.push(product);
    this._router.navigate(['/products']);
    this._snackbar.openSnackBar(`product ${product.pname} is added`)
    
  }

  updateProd(updatedProdObj: Iproduct){
    let getIndex = this.prodArr.findIndex(prod => prod.pid === updatedProdObj.pid)
    this.prodArr[getIndex] = updatedProdObj;
    this._router.navigate(['/products']);
    this._snackbar.openSnackBar(`the product ${updatedProdObj.pname} is updated`)
  }

  removeProd(prodId:string){
    let getIndex = this.prodArr.findIndex(prod=>prod.pid===prodId);

    let removedProduct = this.prodArr[getIndex]
    this.prodArr.splice(getIndex,1);
    this._router.navigate(['/products'])
    this._snackbar.openSnackBar(`Product ${removedProduct.pname} is removed`)
  }
}
