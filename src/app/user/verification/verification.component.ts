import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { VerifiyCode } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  verificationForm: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder) { }

  get f() {
    return this.verificationForm.controls;
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.verificationForm = this.fb.group({
      code: [null, Validators.required]
    });
  }

  verify(): void {
    this.store.dispatch(new VerifiyCode(this.verificationForm.value));
  }

}
