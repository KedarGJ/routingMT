import { Injectable } from '@angular/core';
import { Iuser } from '../model/users';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userArr : Array<Iuser>=[
    {
      userName:"OM",
      userId:"111",
      userRole:'Admin'
    },
    {
      userName:"Hari",
      userId:"112",
      userRole:'buyer'
    },
    {
      userName:"Jay",
      userId:"113",
      userRole:'buyer'
    },
  ]
  constructor(
    private _router : Router,
    private _snackBar : SnackbarService
  ) { }

  fetchAllusers(){
    return this.userArr;
  }

  getuserinfo(id:string){
    return this.userArr.find(user =>user.userId === id ) as Iuser
  }

  addUser(user:Iuser){
    this.userArr.push(user)
    this._router.navigate(['/users']);
    this._snackBar.openSnackBar(`product ${user.userName} is added`)
  }

  updateUser(updatedUserObj: Iuser){
    let getIndex= this.userArr.findIndex(user=>user.userId===updatedUserObj.userId);
    this.userArr[getIndex]= updatedUserObj;
    this._router.navigate(['/users']);
    this._snackBar.openSnackBar(`the User ${updatedUserObj.userName} is updated`)
  }

  removeUser(userId:string){
    let getIndex = this.userArr.findIndex(user => user.userId === userId);
    let removeUser= this.userArr[getIndex]
    this.userArr.splice(getIndex,1);
    this._router.navigate(['/users']);
    this._snackBar.openSnackBar(`user ${removeUser.userName} is removed`)
  }
}
