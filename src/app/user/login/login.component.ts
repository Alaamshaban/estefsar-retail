import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LoginComponent>) { }

  get f() {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required, Validators.email],
      password: [null, Validators.required]
    });
  }

  signUp(): void {
    this.dialogRef.close();
    this.router.navigate(['user/signup']);
  }

}
