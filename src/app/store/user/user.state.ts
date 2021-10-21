import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserModel, UserResponse } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { SetUser, VerifiyCode, CreateAccount } from './user.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
export interface UserStateModel {
    user: UserModel;
    sessionInfo: string;
    jwt: {
        access: string;
        refresh: string;
    };
    errors?: any;
}

@State<UserStateModel>({
    name: 'User'
})
@Injectable()
export class UserState {
    constructor(
        private snackBar: MatSnackBar,
        private authSerive: AuthService) { }

    @Selector()
    static getUSerID(User: UserStateModel): string {
        return User.user.user_id;
    }

    @Selector()
    static getUSerErrors(state: UserStateModel): any {
        return state.errors;
    }

    @Selector()
    static getUSerToken(state: UserStateModel): any {
        return state.jwt.access;
    }

    @Action(SetUser)
    setUser(ctx: StateContext<UserStateModel>) {
        const state = ctx.getState();
        return this.authSerive.getLoggedInUser(state.jwt).pipe(
            tap(
                (user: UserModel) => {
                    ctx.patchState({ user: { ...user } });
                }
            ),
            catchError(
                (err: HttpErrorResponse) => {
                    this.snackBar.open(err.error, '', {
                        duration: 3000,
                    });
                    throw (err);
                }
            )
        );
    }

    @Action(CreateAccount)
    createAccount(ctx: StateContext<UserStateModel>, action: CreateAccount) {
        const state = ctx.getState();
        return this.authSerive.createAccount(action.payload).pipe(
            tap(
                (res) => {
                    ctx.patchState({ user: { ...res.user }, sessionInfo: res.sessionInfo });
                }
            ),
            catchError(
                (err: HttpErrorResponse) => {
                    ctx.patchState({ errors: err.error });
                    throw (err);
                }
            )
        );
    }

    @Action(VerifiyCode)
    verifiyCode(ctx: StateContext<UserStateModel>, action: VerifiyCode) {
        const state = ctx.getState();
        return this.authSerive.verifyMobileNumber(state.user, state.sessionInfo, action.payload).pipe(
            tap(
                (res) => {
                    ctx.patchState({ jwt: { ...res.jwt } });
                    this.snackBar.open('Your account is creates successfully', '', {
                        duration: 3000,
                    });
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
