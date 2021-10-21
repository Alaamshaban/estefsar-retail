import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { ConfirmedValidator } from 'src/app/shared/validators/confirm-pass-validator';
import { CreateAccount } from 'src/app/store/user/user.actions';
import { LoginComponent } from '../login/login.component';
import firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from 'src/environments/environment';
import { UserState } from 'src/app/store/user/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, AfterViewInit {
  signUPForm: FormGroup;
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  @Select(UserState.getUSerErrors)
  errors$: Observable<any>;
  BeError: string;

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
    firebase.initializeApp(environment.firebaseConfig);
    this.setForm();
    this.actions$.pipe(ofActionSuccessful(CreateAccount)).subscribe(res => {
      this.router.navigate(['user/verification']);
    });
    this.signUPForm.valueChanges.subscribe(val => {
      this.signUPForm.clearValidators();
    });
  }

  setForm(): void {
    this.signUPForm = this.fb.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [null, [Validators.pattern(/^(?=.*[0-9])[- +()0-9]+$/), Validators.required]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  ngAfterViewInit(): void {
    this.getToken();
    this.subscribeToBeErrors();
  }

  getToken(): void {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'signup-btn',
      {
        size: 'invisible',
        callback: (token) => {
          if (token) {
            this.signUp(token);
          }
        },
      }
    );
    this.recaptchaVerifier.render();
  }

  subscribeToBeErrors(): void {
    this.errors$.subscribe(errors => {
      if (errors !== undefined && Object.keys(errors).length !== 0) {
        const intersections = Object.keys(this.signUPForm.controls).
          map(ctrl => {
            return Object.keys(errors).find(err => err === ctrl);
          });
        intersections.forEach(field => {
          if (field) {
            this.signUPForm.get(field).setErrors({ invalid_field: true });
            this.signUPForm.get(field).markAsTouched();
            this.BeError = errors[field];
          }
        });
      }
    });

  }

  signUp(token): void {
    if (this.signUPForm.valid) {
      const body = {
        ...this.signUPForm.value,
        recaptchaToken: token
      };
      this.store.dispatch(new CreateAccount(body));
    }
  }

  get f() {
    return this.signUPForm.controls;
  }

}
