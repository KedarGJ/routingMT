import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';


const matArr=[
  MatSnackBarModule,
  MatButtonModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...matArr
  ],
  exports:[
    ...matArr
  ]
})
export class MaterialModule { }
