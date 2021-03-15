import { Component, OnInit } from '@angular/core';
import { LoginService } from './components/login/login.service';
import { UsersService } from './components/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  selectedTab='home';

  constructor(private loginService: LoginService,private usersService: UsersService) { }

  ngOnInit() {
    this.loginService.onLoad();
    this.usersService.onLoad();
  }
  onNavigate(tabName: string) {
    this.selectedTab = tabName;
  }
}
