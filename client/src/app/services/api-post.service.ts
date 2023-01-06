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
      Authorization: `Bearer ${this.app.user?.token}`,
    })

    return Headers
  }

  create(postForm: FormGroup): Observable<any> {
    let fd = new FormData()
    fd.append('title', postForm.value.title)
    fd.append('desc', postForm.value.desc)
    fd.append('text', postForm.value.text)
    fd.append('image', postForm.value.image)

    return this.http.post(
      `${host}post`,
      fd,
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
    let fd = new FormData()
    fd.append('title', postForm.value.title)
    fd.append('desc', postForm.value.desc)
    fd.append('text', postForm.value.text)
    fd.append('image', postForm.value.image)

    return this.http.patch(
      `${host}post/${idParam}`,
      fd,
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
