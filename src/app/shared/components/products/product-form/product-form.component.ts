import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/products';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  prodForm !: FormGroup;
  isinEditMode : boolean = false
  productId!: string
  productObj !: Iproduct;
  canEditParams !: number
  constructor(
    private _uuid:UuidService,
    private _prodservice: ProductsService,
    private _routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createProdForm();
    this.patchProd();
    this.canEditParams= +this._routes.snapshot.queryParams['canEdit'];
    if(this.canEditParams === 0){
      this.prodForm.disable()
    }else{
      this.prodForm.enable()
    }
  }


  patchProd(){
    this.productId = this._routes.snapshot.params['productId']
    if(this.productId){
      this.isinEditMode = true;
      this.productObj = this._prodservice.getProductDetails(this.productId);
      this.prodForm.patchValue(this.productObj)
    }else{
      this.isinEditMode= false;
    }
  }

  createProdForm(){
    this.prodForm=new FormGroup({
      pname: new FormControl(null,[Validators.required]),
      pstatus: new FormControl(null,[Validators.required]),
      canReturn : new FormControl(null,[Validators.required])
    }) }


    onProdAdd(){
      if(this.prodForm.valid){
        let canReturnVal = +this.prodForm.get('canReturn')?.value;
        let newProd : Iproduct = {...this.prodForm.getRawValue(),pid:this._uuid.Uuid(),canReturn:canReturnVal};
        this._prodservice.addProduct(newProd)
      }
    }

    onProdUpdate(){
      if(this.prodForm.valid){
        let canReturnVal = +this.prodForm.get('canReturn')?.value;
        let updatedObj:Iproduct = {...this.prodForm.value, canReturn:canReturnVal,pid:this.productId};
        this._prodservice.updateProd(updatedObj)
      }
    }
}
