import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { host } from './api-host';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class ApiPostService {

  constructor(
    private http: HttpClient,
    private app: AppService
  ) {}

  getHeaders(): HttpHeaders {
    const Headers = new HttpHeaders({
      Authorization: `Bearer ${this.app.user?.token}`
    })
    return Headers
  }

  create(postForm: FormGroup) {
    return this.http.post(
      `${host}post`,
      {
        title: postForm.value.title,
        desc: postForm.value.desc,
        text: postForm.value.text
      },
      {
        headers: this.getHeaders()
      }
    )
  }

  getAll(): Observable<any> {
    return this.http.get(`${host}post`)
  }

  getOne(id: number): Observable<any> {
    return this.http.get(`${host}post/${id}`)
  }

  update(postForm: FormGroup, idParam: number): Observable<any> {
    return this.http.patch(
      `${host}post/${idParam}`,
      {
        title: postForm.value.title,
        desc: postForm.value.desc,
        text: postForm.value.text
      },
      {
        headers: this.getHeaders()
      }
    )
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${host}post/${id}`,
      {
        headers: this.getHeaders()
      }  
    )
  }
}
