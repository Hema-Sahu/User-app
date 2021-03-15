import { EventEmitter, Injectable, Output } from '@angular/core';
import { User } from './user.model';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import {environment} from './../../../environments/environment';

@Injectable()
export class LoginService {
    currentUser = new EventEmitter<User>();
    cUser: User;
    url: string = "";

    constructor(private http: Http){
        this.url = environment.production ? '':'http://localhost:3000';
    }
    
    onLoad() {
        try{
            var user: User = JSON.parse(localStorage.getItem('userapp'));
            if(user !== undefined) {
                this.currentUser.emit(user);
                this.cUser = user;
                console.log(user);
            }
        }catch(err) {
            console.log(err);
        }

    }

    signUpService(user) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = JSON.stringify(user);
        return this.http.post(this.url+'/api/users',body, { headers: headers });
    }

    signInService(email: string, password: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var user = {
            email:email,
            password:password
        };
        var body = JSON.stringify(user);
        console.log(body);
        return this.http.post(this.url+'/api/users/login',body, { headers: headers });
        
    }
    logOut() {
        this.cUser = undefined;        
        localStorage.setItem("userapp", "");
    }
}