import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthenticationService} from "../serviceV2/user-authentication.service";
import {Store} from "@ngxs/store";
import {UserDetailsActions} from "../shared/app-state/actions/user-details.action";
import ValidResetPasswordTokenResponse = UserDetailsActions.ValidResetPasswordTokenResponse;
import {MatDialog} from "@angular/material/dialog";
import {ChangePasswordComponent} from "../private/change-password/change-password.component";
import {BaseUserDetails} from "../shared/domain/userModel/user-details.model";

@Injectable({
  providedIn: 'root'
})
export class PaswordResetGuard implements CanActivate {
  constructor(private authService: UserAuthenticationService,
              private store: Store,
              private router: Router,
              private dialog: MatDialog) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const tokenId = next.params.id;
    this.store
      .dispatch(new ValidResetPasswordTokenResponse(tokenId.substring(1)))
      .subscribe(value => {
        this.dialog.open(ChangePasswordComponent)
        this.router.navigate(['/welcome']);
      });
    /*this.authService
      .validatePasswordTokenId( {tokenId: tokenId.substring(1)} )
      .subscribe(value => console.log(value))*/

    return false;
  }


}
