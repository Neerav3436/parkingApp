import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    public authContext = new BehaviorSubject<any>(null);
    constructor(private angularFireAuth: AngularFireAuth, private router: Router, public ngZone: NgZone, private snackbarService: SnackbarService) {
    }

    public SignUp(email: string, password: string) {
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password).then(res => {
            this.sendEmailVerification();
        }).catch(error => {
            this.snackbarService.openSnackBar(error.message, 'close');
        });
    }

    public SignIn(email: string, password: string) {
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
            if (res) {
                if (res.user.emailVerified !== true) {
                    this.sendEmailVerification();
                    this.snackbarService.openSnackBar('Please validate your email address. Kindly check your inbox.', 'close');
                } else {
                    this.ngZone.run(() => {
                        this.updateAuthContext(res);
                        this.router.navigateByUrl('/expenses/:id');
                    });
                }
            }
        }).catch(err => {
            this.router.navigateByUrl('');
            this.snackbarService.openSnackBar('Either Username or Password is wrong', 'close');
        });
    }

    public SignOut() {
        this.angularFireAuth.auth.signOut();
        this.updateAuthContext(null);
        this.router.navigateByUrl('');
    }

    public sendEmailVerification() {
        this.angularFireAuth.auth.currentUser.sendEmailVerification().then(() => {
            this.router.navigateByUrl('');
        })
    }

    public loginWithGoogle() {
        this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(result => {
            this.ngZone.run(() => {
                this.updateAuthContext(result);
                this.router.navigateByUrl('expenses/:id');
            })
        }).catch(error => {
            this.router.navigate(['']);
        })
    }

    public updateAuthContext(update: any) {
        this.authContext.next(update);
    }
}