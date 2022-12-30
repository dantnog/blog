import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { host } from './api-host';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private http: HttpClient) { }

  create(userForm: FormGroup): Observable<any> {
    return this.http.post(
      `${host}user/register`,
      {
        name: userForm.value.name,
        email: userForm.value.email,
        password: userForm.value.password,
      }
    )
  }

  login(userForm: FormGroup): Observable<any> {
    return this.http.post(
      `${host}user/login`,
      {
        email: userForm.value.email,
        password: userForm.value.password
      }
    )
  }

}
