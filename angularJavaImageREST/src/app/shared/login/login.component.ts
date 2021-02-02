import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {AuthenticationActions} from "../app-state/actions/authentication-action";
import {GoogleUserLogin, UserLoginModel} from "../domain/userModel/UserLoginModel";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserAuthenticationService} from "../../serviceV2/user-authentication.service";
import {Navigate} from "@ngxs/router-plugin";
import {Location} from "@angular/common";
import LoggedUserDetails = AuthenticationActions.LoggedUserDetails;
import {log} from "util";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {ActivatedRoute} from "@angular/router";
import {RequestStatusState} from "../app-state/states/request-status.state";
import {RequestMessageAction} from "../app-state/actions/request-message.action";
import {VerificationDialogComponent} from "../../public/verification-dialog/verification-dialog.component";
import {RenewExpiredAccountTokenComponent} from "../../public/renew-expired-account-token/renew-expired-account-token.component";
import {ShowEmailWasSentDialog} from "../util/ShowEmailWasSentDialog";
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin, ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayPositionBuilder
} from "@angular/cdk/overlay";
import {Subject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public formGroup;
  public emailFormField = new FormControl('');
  public passwordFormField = new FormControl('');
  public pressedLogin = false;
  forgotPasswordPressed = false;

  @ViewChild(CdkConnectedOverlay) testing;

  closeToolTip: EventEmitter<boolean> = new EventEmitter<boolean>();

  isOpen = false;

  openToolTip: Subject<boolean> = new Subject<boolean>();

  connectedPosition: ConnectedPosition[] = [{
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
  }];

  variable: FlexibleConnectedPositionStrategy;

  closeTooltip: Subject<boolean> = new Subject<boolean>();

  closeToolTipFunc($event) {
    this.isOpen = !$event;
    console.log($event);
    console.log(this.isOpen);
  }


  @Select(RequestStatusState.getStatus) $requestStatus;
  @Select(RequestStatusState.getStatusCode) $requestStatusCode;

  constructor(private formBuilder: FormBuilder,
              public store: Store,
              private dialogRef: MatDialogRef<LoginComponent>,
              private authService: UserAuthenticationService,
              private location: Location,
              private googleAuthService: SocialAuthService,
              private dialog: MatDialog,
              private overlay: Overlay,
              private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef,) {

    this.formGroup = this.formBuilder.group({
      email: this.emailFormField,
      password: this.passwordFormField
    })
  }

  ngOnInit(): void {
    this.setStatusToNull();

    this.variable = this.overlayPositionBuilder
      // Create position attached to the elementRef
      .flexibleConnectedTo(this.elementRef)
      // Describe how to connect overlay to the elementRef
      // Means, attach overlay's center bottom point to the
      // top center point of the elementRef.
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom',
      }]);

    this.setStatusToNull();

    /*this.$requestStatusCode.subscribe(val => {
      console.log(val);
      this.isOpen = val === 423;
    })*/


    /*this.$requestStatusCode.subscribe(value => {
      if (value !== undefined && value === 423 && this.mail.length > 0 && this.pwd.length > 0) {
        this.dialog.open(RenewExpiredAccountTokenComponent, {
          width: '450px',
          maxWidth: '450px',
          minWidth: '280px',
          height: '300px',
          minHeight: '300px',
          maxHeight: '300px',
          data: {email: this.mail, password: this.pwd}
        });
      }
    })*/

  }

  public setStatusToNull() {
    this.isOpen = false;
    this.store.dispatch(new RequestMessageAction(null))
  }

  get mail(): string {
    return this.formGroup.get('email').value;
  }

  get pwd(): string {
    return this.formGroup.get('password').value;
  }

  public login(): void {
    this.openToolTip.next(this.store.selectSnapshot(RequestStatusState.getStatusCode) === 423)
    this.setStatusToNull();
    console.log(this.testing);
    this.pressedLogin = !this.pressedLogin;
    const email = this.formGroup.get('email').value
    const password = this.formGroup.get('password').value;
    console.log("HALLLOOOO");
    this.store
      .dispatch(
        new AuthenticationActions.LoginAction(
          new UserLoginModel(
            email,
            password
          )
        )).subscribe(value => {

      console.log("HHHHHHHHHHHHHHHHHHHHHH66666");
      console.log(this.store.selectSnapshot(RequestStatusState.getStatusCode));
      this.authService.isLoggedIn()
        .subscribe(value1 => {
          console.log(value1);

          this.store.dispatch(new LoggedUserDetails(value1.body.userId));
          this.close();
        })
    }, error => {
      console.log("HHHHHHHHHHHHHHHHHHHHHH666668899");
    });
  }

  googleLogin(): void {
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(value => {
        this.store.dispatch(new AuthenticationActions.LoginAction(
          new GoogleUserLogin(value.email,
            value.firstName, value.lastName,
            value.photoUrl, value.idToken)
        )).subscribe(value1 => {
          this.store.dispatch(new AuthenticationActions.IsLoggedIn())
            .subscribe(value2 =>
              this.store.dispatch(
                new LoggedUserDetails(value2.Authentication.user.userId))
            )

        });
      });
    this.close();
  }

  public close(): void {
    this.closeTooltip.next(true);
    // this.store.dispatch(new Navigate(['welcome']))
    this.dialogRef.close();
    this.store
      .dispatch(new RequestMessageAction({message: '', status: 0}));
  }

  openRenewDialog() {
    console.log("Na da schau her du beidl");
    this.dialog.open(RenewExpiredAccountTokenComponent, {
      data: {email: this.mail, password: this.pwd}
    });
  }

  forgotPassword() {
    this.authService
      .requestResetPasswordToken({email: this.mail})
      .subscribe(value => new ShowEmailWasSentDialog(this.dialog, value));
  }

  ngAfterViewInit(): void {
    this.setStatusToNull();
  }
}


export interface RenewAccountVerificationToken {
  email?: string;
  password?: string;
  tokenError?: boolean;
  message?: string;
}
