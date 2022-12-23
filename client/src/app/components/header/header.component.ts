import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Styles } from 'src/app/app.styles';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  s = Styles
  faMoon = faMoon 
  faSun = faSun

  constructor(public appService: AppService) {}

  onChangeTheme() {
    this.appService.changeTheme()
  }
}