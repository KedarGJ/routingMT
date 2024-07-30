import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../model/users';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersData !: Array<Iuser>;
  userId !: string;

  constructor(
    private _userServ : UsersService,
    private _routes  : ActivatedRoute  
  ) { }

  ngOnInit(): void {
    this.usersData = this._userServ.fetchAllusers()
  }

}
