import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isAdmin: boolean = true
  isAuth: boolean = true

  posts = [
    {id: 1, title: 'Anything', desc: 'Random words', date: '23-12-2022'},
    {id: 2, title: 'Anything', desc: 'Random words', date: '23-12-2022'},
    {id: 3, title: 'Anything', desc: 'Random words', date: '23-12-2022'},
  ]

  constructor() {}
}
