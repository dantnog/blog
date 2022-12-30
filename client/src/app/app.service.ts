import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isAdmin: boolean = false
  isAuth: boolean = false

  constructor() {}
}
