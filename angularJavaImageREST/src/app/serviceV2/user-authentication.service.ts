import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseUserDetails, UserDetailsImpl, UserRegistrationModel} from "../shared/domain/userModel/user-details.model";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {IUserLoginModel, LoggedInUserModel, UserLoginModel} from "../shared/domain/userModel/UserLoginModel";
import {Select, Store} from "@ngxs/store";
import {SignupState} from "../shared/app-state/states/signup.state";
import {AuthenticationActions} from "../shared/app-state/actions/authentication-action";
import {environment} from "../../environments/environment";
import {ValidateTokenRequestUrl} from "../shared/domain/Validate-Token-Request-Url";

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {
  private readonly USER_SIGNUP = "http://localhost:8880/image-app/users/signUp";
  public static readonly USER_LOGIN = environment.apiUrl + "users/login";
  private readonly USER_LOGOUT = environment.apiUrl + "logout";
  private readonly AUTH_STATUS = environment.apiUrl + "auth/identify/user";
  public static readonly USER_DETAILS = environment.apiUrl + "user/details/";
  public static readonly GOOGLE_LOGIN = environment.apiUrl + "users/oauth/login";
  public static readonly RENEW_TOKEN = environment.apiUrl + "auth/renew/accountToken";
  public static readonly VERIFY_TOKEN_REQUEST = environment.apiUrl + 'verify/show-validated-token/';

  constructor(private http: HttpClient) {

  }

  public validateRequestTokenUrl(req: ValidateTokenRequestUrl): Observable<{ status: boolean; alreadyProcessed: boolean}> {
    return this.http.post<{ status: boolean; alreadyProcessed: boolean}>
    (UserAuthenticationService.VERIFY_TOKEN_REQUEST,
      req,
      {responseType: "json"});
  }


  public renewToken(userLoginModel: IUserLoginModel): Observable<any> {
    console.log('who pressed me ?');
    console.log(userLoginModel);
    return this.http.post<{email: string, password: string}>(UserAuthenticationService.RENEW_TOKEN,
      userLoginModel,
      {observe: 'response', responseType: 'json'});
  }

  public getUserDetails(userId: string): Observable<BaseUserDetails> {
    return this.http.get<BaseUserDetails>
    (UserAuthenticationService.USER_DETAILS + userId, {responseType: "json"});
  }


  public createNewUser(userSignupModel: UserRegistrationModel): Observable<LoggedInUserModel> {
    return this.http
      .post<LoggedInUserModel>(this.USER_SIGNUP, userSignupModel, {observe: "body" , responseType: "json"});
  }

  public login(userLoginModel: IUserLoginModel, loginMethod: string): Observable<any> {
    console.log('who pressed me ?');
    const URL = loginMethod === "GOOGLE" ? UserAuthenticationService.GOOGLE_LOGIN : UserAuthenticationService.USER_LOGIN;
    console.log(userLoginModel);
    return this.http.post<any>(URL, userLoginModel, {observe: 'response'});
  }

  public isLoggedIn(): Observable<any> {
    return this.http.get(this.AUTH_STATUS, {responseType: "json", observe: 'response'})
      .pipe(
        map(value => {
          console.log(value)
          return value;
        })
      );
  }

  public logout(): Observable<any> {
    return this.http.post(this.USER_LOGOUT, {responseType: "json"});
  }

}
