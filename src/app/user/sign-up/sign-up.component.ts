import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { ConfirmedValidator } from 'src/app/shared/validators/confirm-pass-validator';
import { SetUser } from 'src/app/store/user/user.actions';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUPForm: FormGroup;

  constructor(
    private router: Router,
    private actions$: Actions,
    private store: Store,
    private fb: FormBuilder,
    private dialog: MatDialog) { }

  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px'
    });
  }

  ngOnInit(): void {
    this.setForm();
    this.actions$.pipe(ofActionSuccessful(SetUser)).subscribe(res => {
      this.router.navigate(['user/verification']);
    });
  }

  setForm(): void {
    this.signUPForm = this.fb.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.pattern(/^(?=.*[0-9])[- +()0-9]+$/), Validators.required]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  signUp(): void {
    if (this.signUPForm.valid) {
      this.store.dispatch(new SetUser(this.signUPForm.value));
    }
  }

  get f() {
    return this.signUPForm.controls;
  }

}
