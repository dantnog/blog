import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Styles } from 'src/app/app.styles';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  s = Styles
  userForm!: FormGroup
  wrongPass: boolean = false

  constructor(
    private apiUser: ApiUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ])
    })
  }

  get email() {return this.userForm.get('email')!}
  get password() {return this.userForm.get('password')!}

  onSubmit() {
    this.apiUser.login(this.userForm)
      .pipe(
        catchError(err => {
          console.log(err)
          return throwError('ERROR')
        })
      )
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['/'])
      })
  }
}
