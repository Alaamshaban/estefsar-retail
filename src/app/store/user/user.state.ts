import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { UserModel, UserResponse } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { SetUser, VerifiyCode } from './user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface UserStateModel {
    user: UserModel;
    jwt: string;
}

@State<UserStateModel>({
    name: 'User'
})
@Injectable()
export class UserState {
    constructor(
        private snackBar: MatSnackBar,
        private authSerive: AuthService) { }

    @Action(SetUser)
    setUser(ctx: StateContext<UserStateModel>, action: SetUser) {
        const state = ctx.getState();
        return this.authSerive.createAccount(action.payload).pipe(
            tap(
                (user: UserModel) => {
                    ctx.patchState({ user: { ...user } });
                }
            ),
            catchError(
                err => {
                    console.log(err)
                    this.snackBar.open(err);
                    throw (err);
                }
            )
        );
    }

    @Action(VerifiyCode)
    verifiyCode(ctx: StateContext<UserStateModel>, action: VerifiyCode) {
        const state = ctx.getState();
        return this.authSerive.verifyMobileNumber(state.user, action.payload).pipe(
            tap(
                (res) => {
                    ctx.patchState({ jwt: { ...res } });
                }
            ),
            catchError(
                err => {
                    throw (err);
                }
            )
        );
    }
}
