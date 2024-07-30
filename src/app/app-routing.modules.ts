import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./shared/components/home/home.component";
import { UserComponent } from "./shared/components/users/user/user.component";
import { UserFormComponent } from "./shared/components/users/user-form/user-form.component";
import { UsersComponent } from "./shared/components/users/users.component";
import { ProductsComponent } from "./shared/components/products/products.component";
import { ProductFormComponent } from "./shared/components/products/product-form/product-form.component";
import { ProductComponent } from "./shared/components/products/product/product.component";
import { PagenotfoundComponent } from "./shared/components/pagenotfound/pagenotfound.component";

const routes : Routes=[
    {
        path:'',
        component : HomeComponent
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'users',
        component:UsersComponent
    },
    {
        path:'users/addUser',
        component:UserFormComponent
    },
    {
        path:'users/:userId',
        component:UserComponent
    },
    {
        path:'users/:userId/editUser',
        component:UserFormComponent
    },
    {
        path:'products',
        component:ProductsComponent
    },
    {
        path:'products/addProduct',
        component:ProductFormComponent
    },
    {
        path:'products/:productId',
        component:ProductComponent
    },
    {
        path:'products/:productId/editProduct',
        component:ProductFormComponent
    },
    {
        path:'page-not-found',
        component:PagenotfoundComponent
    },
    {
        path:'**',
        component:PagenotfoundComponent
    },
    {
        path:'**',
        redirectTo:"page-not-found"
    }
]





@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
    
}