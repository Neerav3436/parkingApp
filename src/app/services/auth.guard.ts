import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from "../services/Auth.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService implements CanActivate, OnInit {

    constructor(public authService: AuthenticationService, public router: Router) { }

    ngOnInit(): void { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.authService.authContext.subscribe(data => {
            if (data) {
                if ((new JwtHelperService().isTokenExpired(data.user.ma))) {
                    this.router.navigate(['']);
                    return false;
                }
            }
        });
        return true;
    }
}