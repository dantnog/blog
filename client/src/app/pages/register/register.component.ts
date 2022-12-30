import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Styles } from 'src/app/app.styles';
import { ApiUserService } from 'src/app/services/api-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit{
  s = Styles
  userForm!: FormGroup
  notMatchs: boolean = false

  constructor(
    private apiUser: ApiUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
      confirm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(50)
      ]),
    })
  }

  get name() {return this.userForm.get('name')!}
  get email() {return this.userForm.get('email')!}
  get password() {return this.userForm.get('password')!}
  get confirm() {return this.userForm.get('confirm')!}

  async onSubmit() {
    if (this.userForm.get('password')?.value !== this.userForm.get('confirm')?.value) {
      this.notMatchs = true
      return
    }
    await this.apiUser.create(this.userForm)
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