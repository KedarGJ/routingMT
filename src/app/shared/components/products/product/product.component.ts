import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/products';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productId !: string;
  prodObj!: Iproduct
  constructor(
    private _routes : ActivatedRoute,
    private _prodService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productId = this._routes.snapshot.params['productId']
    if(this.productId){
      this.prodObj = this._prodService.getProductDetails(this.productId)
    }
  }

  onRemoveProd(){
    if(this.productId){
      this._prodService.removeProd(this.productId)
    }
  }


}

