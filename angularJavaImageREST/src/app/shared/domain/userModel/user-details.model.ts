import {UserAddressModel} from "../address-model/user-address-model";
import {ImageModel} from "../imageModel/image.model";

export interface BaseUserDetails {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  likes?: ImageModel[];
  images?: ImageModel[];
  profileImgPath?: string;
  password?: string;
  address?: UserAddressModel;
}

export class UserRegistrationModel implements BaseUserDetails{
  email: string;
  firstName: string;
  lastName: string;
  password: string;

  constructor(firstName: string, lastName: string,
              email: string, password: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}

export class UserDetailsImpl implements BaseUserDetails{
  userId: string
  email: string;
  firstName: string;
  lastName: string;
  profileImgPath: string;
  username: string;


  constructor(userId: string, email: string,
              firstName: string, lastName: string,
              profileImgPath: string, username: string) {
    this.userId = userId;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profileImgPath = profileImgPath;
    this.username = username;
  }
}


