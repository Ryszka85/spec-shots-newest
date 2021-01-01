import {Action, Selector, State, StateContext} from "@ngxs/store";
import {IUserAuthState} from "../../domain/UserAuthStateModel";
import {Injectable} from "@angular/core";
import {UserDetailsActions, ValidResetPasswordToken} from "../actions/user-details.action";
import {UserAuthenticationService} from "../../../serviceV2/user-authentication.service";
import {AuthenticationActions} from "../actions/authentication-action";
import ValidResetPasswordTokenResponse = UserDetailsActions.ValidResetPasswordTokenResponse;
import {Observable, of} from "rxjs";
import {map, switchMap} from "rxjs/operators";

@State<ValidResetPasswordToken>({
  name: 'ResetPassword',
  defaults: {
    tokenId: '',
    userId: ''
  }
})
@Injectable()
export class ValidPasswordTokenState {
  constructor(private authService: UserAuthenticationService) { }

  @Selector()
  static getTokenId(state: ValidResetPasswordToken): string {
    return state.tokenId;
  }

  @Selector()
  static getUserId(state: ValidResetPasswordToken): string {
    return state.userId;
  }

  @Selector()
  static getRequest(state: ValidResetPasswordToken): ValidResetPasswordToken {
    return state;
  }


  @Action(ValidResetPasswordTokenResponse)
  setTokenState(ctx: StateContext<ValidResetPasswordToken>, action: ValidResetPasswordTokenResponse): Observable<ValidResetPasswordToken> {
    return this.authService
      .validatePasswordTokenId({tokenId: action.tokenId})
      .pipe(switchMap(response => {
        ctx.patchState({userId: response.userId, tokenId: response.tokenId});
        return of(ctx.getState());
      }));
  }
}
