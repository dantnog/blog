import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Styles } from './app.styles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  s = Styles

  constructor(private app: AppService) {}

  ngOnInit(): void {
    this.app.getUserFromLS()
  }
}
