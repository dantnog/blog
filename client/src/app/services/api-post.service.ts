import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host } from './api-host';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApiPostService {

  constructor(private http: HttpClient) {}

  async create(postForm: FormGroup) {
    await this.http.post(
      `${host}post`,
      {
        title: postForm.value.title,
        desc: postForm.value.desc,
        text: postForm.value.text
      }
    )
    .pipe(
      catchError(err => {
        console.error(err)
        return throwError('ERROR')
      })
    )
    .subscribe(res => console.log(res))

    return true
  }

  getAll(): Observable<any> {
    return this.http.get(`${host}post`)
  }

  getOne(id: number): Observable<any> {
    return this.http.get(`${host}post/${id}`)
  }
}
