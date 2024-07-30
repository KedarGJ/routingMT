import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Iuser } from 'src/app/shared/model/users';
import { UsersService } from 'src/app/shared/services/users.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm !: FormGroup;
  userId !: string;
  userObj !: Iuser;
  isinEditmode : boolean = false;
  userRole !: "Admin" | "buyer";
  constructor(
    private _uuidserv : UuidService,
    private _userServ : UsersService,
    private _routes : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createUserForm();
    this.patchUser();
    this. manageQueryparams()

  }

  createUserForm(){
    this.userForm= new FormGroup({
      userName : new FormControl(null,[Validators.required]),
      userRole: new FormControl(null,[Validators.required])
    })
  }

  onUserAdd(){
    if(this.userForm.valid){
      let newUser : Iuser={...this.userForm.value,userId:this._uuidserv.Uuid()};
      this._userServ.addUser(newUser)
    }
  }

  manageQueryparams(){
    this.userRole = this._routes.snapshot.queryParams['userRole'];
    if(this.userRole){
      if(this.userRole === "buyer"){
        this.userForm.disable()
      }else{
        this.userForm.enable()
      }
    }
  }


  patchUser(){
    this.userId = this._routes.snapshot.params['userId'];
    if(this.userId){
      this.isinEditmode=true;
      this.userObj = this._userServ.getuserinfo(this.userId);
      this.userForm.patchValue(this.userObj)
    }else{
      this.isinEditmode = false
    }
  }

  onUpdateuser(){
    if(this.userForm.valid){
      let updatedObj:Iuser={...this.userForm.value,userId:this.userId};
      this._userServ.updateUser(updatedObj)
    }
  }

}
