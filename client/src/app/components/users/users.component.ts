import { Component, Input, OnInit} from '@angular/core';
import { User } from '../login/user.model';
import { UsersService } from './users.service';
import { LoginService } from '../login/login.service';
import { browser } from 'protractor';
import { Http } from '@angular/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  currentUser: User;

  constructor(private loginService: LoginService,private usersService: UsersService) { 
    this.loginService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
      }
    );
  }
  
  ngOnInit() {
    this.usersService.getUsers().subscribe((response) => {
        console.log("users",response)
        var data =  JSON.parse(response["_body"]);

     });
  }

}
