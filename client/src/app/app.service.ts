import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  darkTheme: boolean = false
  isAdmin: boolean = true
  isAuth: boolean = true

  posts = [
    {id: 1, title: 'Anything', desc: 'Random words', date: '23-12-2022'},
    {id: 2, title: 'Anything', desc: 'Random words', date: '23-12-2022'},
    {id: 3, title: 'Anything', desc: 'Random words', date: '23-12-2022'},
  ]

  constructor() {
  }

  changeTheme(): void {
    this.darkTheme
    ? document.documentElement.classList.remove('dark')
    : document.documentElement.classList.add('dark')

    this.darkTheme = !this.darkTheme
    localStorage.setItem('darkTheme', String(this.darkTheme))
  }

  loadTheme(): void {
    if (localStorage.getItem('darkTheme') === 'true') {
      this.darkTheme = true
      document.documentElement.classList.add('dark')
    }
  }
}
