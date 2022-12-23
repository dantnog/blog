import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Styles } from 'src/app/app.styles';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  s = Styles

  constructor(public appService: AppService) {}

  onOpen(postId: number) {
    alert(`Open ${postId}`)
  }

  onEdit(postId: number) {
    alert(`Edit ${postId}`)
  }

  onDelete(postId: number) {
    alert(`Delete ${postId}`)
  }
}
