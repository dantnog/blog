import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isAdmin: boolean = true
  isAuth: boolean = true

  constructor() {}
}
