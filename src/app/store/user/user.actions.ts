import { UserModel } from 'src/app/shared/models/user.model';

export class SetUser {
  public static readonly type = '[User] set user';
  constructor() { }
}

export class CreateAccount {
  public static readonly type = '[User] Create Account';
  constructor(public payload: UserModel) { }
}

export class VerifiyCode {
  public static readonly type = '[User] verify code';
  constructor(public payload: string) { }
}
