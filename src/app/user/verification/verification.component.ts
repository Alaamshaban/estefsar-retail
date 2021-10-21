import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { SetUser, VerifiyCode } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  verificationForm: FormGroup;

  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions,
    private fb: FormBuilder) { }

  get f() {
    return this.verificationForm.controls;
  }

  ngOnInit(): void {
    this.setForm();
    this.actions$.pipe(ofActionSuccessful(VerifiyCode)).subscribe(res => {
      this.router.navigate(['home']);
      this.store.dispatch(new SetUser());
    });
  }

  setForm(): void {
    this.verificationForm = this.fb.group({
      code: [null, Validators.required]
    });
  }

  verify(): void {
    this.store.dispatch(new VerifiyCode(this.verificationForm.value.code));
  }

}
