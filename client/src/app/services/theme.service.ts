import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkTheme: boolean = false

  constructor() { }

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
