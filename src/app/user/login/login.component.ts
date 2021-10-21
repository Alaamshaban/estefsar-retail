import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    private authService: AuthService,
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
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  login(): void {
    this.dialogRef.close();
    this.authService.login(this.loginForm.value).subscribe(res => {
      console.log(res);
      this.dialogRef.close();
      this.router.navigate(['home']);
    });
  }

  signUp(): void {
    this.dialogRef.close();
    this.router.navigate(['user/signup']);
  }

}
