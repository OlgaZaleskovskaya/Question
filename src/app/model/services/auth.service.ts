import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { PageService } from '../models/page.service';
import { Subject, Observable } from 'rxjs';
import { User } from '../models/user.model';




@Injectable()
export class AuthService {
    token: string;
    isLogin: string;
    isLoggedIn: string;
    onLogin: Subject<boolean>;
    onUser: Subject<User>;
    currentUser: User;
    // to be removed
    users: User[];
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            );
    }

    constructor(private pageService: PageService) {
        this.onLogin = new Subject<boolean>();
        this.onUser = new Subject<User>();
        this.users = [
            new User("Mouse", "mmz.service@gmail.com", "admin", "123456"),
            new User("Chirick", "oz.flexo@gmail.com", "user", "123456"),
        ];

    }
    signinUser(email: string, password: string): any {

        const evenNumbers = Observable.create(function(observer) {
            let value = true;
            this.users.forEach((item, index, arr) => {
                            if (item['_mail'] == email) {
                                this.isLoggedIn = item['type'];
                            } else{
                                value = false;
                            }
                       });
            const interval = setTimeout(() => {
                observer.next(value);
            }, 1000);
            return () => clearInterval(interval);
          });
        // firebase.auth().signInWithEmailAndPassword(email, password)
        //     .then(response => {
             
        //         this.users.forEach((item, index, arr) => {
        //             if (item['_mail'] == email) {
        //                 this.isLoggedIn = item['type'];
        //             }
        //         });
        //         firebase.auth().currentUser.getIdToken()
        //             .then(response => {
        //                 this.token = response;
        //                 this.onLogin.next(true);
        //                 // for debugging
        //                 this.currentUser = this.users[0];
        //                 this.onUser.next(this.currentUser);
        //             })
        //         console.log('token =');
        //     }
        //     ),
        //     error => {
        //       console.log("an error")
        //     }
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) =>
                    this.token = token
            );
        return this.token;
    }


}