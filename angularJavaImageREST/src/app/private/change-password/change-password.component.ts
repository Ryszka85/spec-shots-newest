import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {BaseUserDetails} from "../../shared/domain/userModel/user-details.model";
import {ImageCropperComponent} from "../image-cropper/image-cropper.component";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {UpdateUserService} from "../../serviceV2/update-user.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public formGroup: FormGroup;
  oldPasswordFormField: any;
  newPasswordFormField: any;
  confirmPwdFormField: any;
  errorMsg: {
    error: boolean;
    msg: string;
  } = { error: true, msg: ''};
  requestStatus: {
    status: boolean,
    errorMsg: string
  } = { status: false, errorMsg: ''};

  constructor(@Inject(MAT_DIALOG_DATA) public userDetails: BaseUserDetails,
              private dialogRef: MatDialogRef<ChangePasswordComponent>,
              private fb: FormBuilder,
              private userService: UpdateUserService) { }

  ngOnInit(): void {
    this.initFormFields();

  }

  get oldPwd(): string {
    return this.formGroup.get('oldPassword').value;
  }

  get newPwd(): string {
    return this.formGroup.get('newPassword').value;
  }
  get confirmPwd(): string {
    return this.formGroup.get('confirmPassword').value;
  }

  get newPwdControl(): AbstractControl {
    return this.formGroup.get('oldPassword');
  }


  private initFormFields() {
    this.oldPasswordFormField = new FormControl('', Validators.compose(
      [
        Validators.required,
        Validators.minLength(6)
      ]));
    this.newPasswordFormField = new FormControl('', Validators.compose(
      [
        Validators.required
      ]));
    this.confirmPwdFormField = new FormControl('', Validators.compose(
      [
        Validators.required
      ]));
    this.formGroup = this.fb.group({
      oldPassword: this.oldPasswordFormField,
      newPassword: this.newPasswordFormField,
      confirmPassword: this.confirmPwdFormField
    });
  }

  checkPasswords() {
    console.log(this.formGroup.get('confirmPassword').errors === null);
    console.log(this.formGroup.get('newPassword').errors === null);
    if (this.formGroup.get('confirmPassword').value.length > 5 &&
      this.formGroup.get('newPassword').value.length > 5) {
      if (this.confirmPwd === this.newPwd) {
        this.formGroup
          .get('newPassword')
          .setErrors(null);
        this.errorMsg.error = false;
      } else {
        this.formGroup
          .get('newPassword')
          .setErrors({incorrect: true});
        this.errorMsg.error = true;
        this.errorMsg.msg = 'Password does not match';
      }
    } else {
      this.formGroup
        .controls['newPassword']
        .setErrors({incorrect: true});
      this.errorMsg.error = true;
      this.errorMsg.msg = 'Password must be at least 5 characters long';
    }

  }

  changePassword(): void {
    this.userService.changeUserPassword(this.userDetails.userId,
      {
        oldPassword: this.oldPwd,
        newPassword: this.newPwd
      }).subscribe(value => {
      this.requestStatus.errorMsg = value.body.errorMsg;
      this.requestStatus.status = value.body.status;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

