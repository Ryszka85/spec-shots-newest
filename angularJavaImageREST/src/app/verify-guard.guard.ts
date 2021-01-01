import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  ActivatedRoute,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {UserAuthenticationService} from "./serviceV2/user-authentication.service";
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {RenewExpiredAccountTokenComponent} from "./public/renew-expired-account-token/renew-expired-account-token.component";
import {VerificationDialogComponent} from "./public/verification-dialog/verification-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class VerifyGuardGuard implements CanActivate {

  constructor(private authService: UserAuthenticationService,
              private router: Router,
              private dialog: MatDialog) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const tokenId = next.params.id;
    if (tokenId !== undefined && tokenId.length > 0) {
      console.log("HALLLOO???");
      return this.authService
        .validateRequestTokenUrl({tokenId: tokenId})
        .pipe(map(value => {
          console.log("Ich wars");
          console.log(value);
          console.log(value.status);
          this.router.navigate(['/welcome']);
          if (value.status === true && value.alreadyProcessed) {
            this.dialog.open(VerificationDialogComponent, {
              width: '450px',
              maxWidth: '450px',
              minWidth: '280px',
              height: '300px',
              minHeight: '300px',
              maxHeight: '300px',
              data: {text: 'Account has been verified!'}
            })
          } else {
            console.log("FOOOOOOOOOOOOOO");
            this.dialog.open(RenewExpiredAccountTokenComponent, {
              width: '450px',
              maxWidth: '450px',
              minWidth: '280px',
              height: '300px',
              minHeight: '300px',
              maxHeight: '300px',
              data : {tokenError: true}, hasBackdrop: true
            })
          }
          /*this.router.navigate(['/welcome']);*/
          return false;
        }));
    }
    /*this.router.navigate(['/welcome']);*/
    return false;
  }

}
