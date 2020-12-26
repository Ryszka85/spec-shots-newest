import {Component, Inject, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseUserDetails} from "../../shared/domain/userModel/user-details.model";
import {UpdateUserService} from "../../serviceV2/update-user.service";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {Navigate} from "@ngxs/router-plugin";
import {LoginStateModel} from "../../shared/app-state/states/login.state.model";
import {AuthenticationActions} from "../../shared/app-state/actions/authentication-action";
import LoginAction = AuthenticationActions.LoginAction;

@Component({
  selector: 'app-delete-user-account-dialog',
  templateUrl: './delete-user-account-dialog.component.html',
  styleUrls: ['./delete-user-account-dialog.component.scss']
})
export class DeleteUserAccountDialogComponent implements OnInit {
  password: any;
  public formGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public userDetails: BaseUserDetails,
              private dialogRef: MatDialogRef<DeleteUserAccountDialogComponent>,
              private fb: FormBuilder,
              private userService: UpdateUserService,
              private router: Router,
              private store: Store) {
  }

  ngOnInit(): void {
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.formGroup = this.fb.group({
      password: this.password
    });
    this.formGroup.get('password').valueChanges.subscribe(value => console.log(value))
  }

  get pwd(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  deleteAccount() {
    this.userService
      .deleteUserAccount({userId: this.userDetails.userId, password: this.pwd.value})
      .subscribe(value => {
      }, error => {
      }, () => {
        this.dialogRef.close();
        this.store.dispatch(new AuthenticationActions.Logout())
          .subscribe(value =>
            this.store.dispatch(new Navigate(['welcome'])));
      });
  }
}
