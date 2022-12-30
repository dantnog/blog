import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Styles } from './app.styles';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  s = Styles

  constructor(
    private app: AppService,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.app.getUserFromLS()
    this.theme.loadTheme()
  }
}
