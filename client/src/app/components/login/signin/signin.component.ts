import { Component, OnInit } from '@angular/core';
import { NgForm, FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  signInForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private router:Router,
    public snackBar: MatSnackBar) {  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSignIn(){
    const email = this.signInForm.value.email;
    const password = this.signInForm.value.password;

    this.loginService.signInService(email, password)
      .subscribe(
        (response) => {     
          if(response.status === 200) {
            console.log('Login successfull');
            this.router.navigateByUrl('/users'); 
          } else if(response.status === 404) {
            this.snackBar.open("You are not valid user.", "Got-it");
          }  else {
            this.snackBar.open("Server issues.", "Got-it");
          }
        },
        (err) => console.log(err)
      );

  }
}
