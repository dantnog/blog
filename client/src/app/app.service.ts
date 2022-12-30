import { Injectable } from '@angular/core';

interface UserType {
  id: number
  name: string 
  email: string 
  createdAt: string 
  updatedAt: string 
  admin: boolean 
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isAdmin: boolean = false
  isAuth: boolean = false
  user: UserType|null = null

  constructor() {}

  setUser(user: UserType, writeLS=true) {
    this.isAdmin = user.admin
    this.isAuth = true
    this.user = user
    if (writeLS) this.setUserOnLS()
  }

  getUserFromLS() {
    const user = localStorage.getItem('user')
    if (user) this.setUser(JSON.parse(user), false)
  }

  setUserOnLS() {
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  logout() {
    this.isAdmin = false
    this.isAuth = false
    this.user = null
    localStorage.removeItem('user')
  }
}
