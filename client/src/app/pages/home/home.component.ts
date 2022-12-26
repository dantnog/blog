import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Styles } from 'src/app/app.styles';
import { ApiPostService } from 'src/app/services/api-post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  s = Styles
  allPosts!: any

  constructor(
    public app: AppService,
    public apiPost: ApiPostService
  ) {}

  ngOnInit() {
    this.apiPost.getAll()
    .subscribe(res => this.allPosts = res)
  }

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
