import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'profilePic': new FormControl(null, [Validators.required])
    });
  }

  onSignUp() {
    const userName = this.signUpForm.value.username;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    const profilePic = this.signUpForm.value.profilePic;
    var newUser = { userName, email, password, profilePic };
    // Signup service
    this.loginService.signUpService(newUser)
      .subscribe(
        (response) => {
          if(response.status === 200) {
            var data =  JSON.parse(response["_body"]);
            console.log(data);
            var user = new User(data._id, data.userName, data.email, data.password, data.profilePic);
            this.loginService.currentUser.emit(user);
            this.loginService.cUser = user;
            localStorage.setItem("shoppingCart", JSON.stringify(user));
            this.router.navigateByUrl('/products');      
          } else if(response.status === 404) {
            
          }  else {
           
          }
        },
        (error) => console.log(error)
      );

  }
}
