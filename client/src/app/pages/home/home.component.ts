import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Styles } from 'src/app/app.styles';
import { ApiPostService } from 'src/app/services/api-post.service';
import { Router } from '@angular/router';

interface postProps {
  id: number 
  title: string 
  desc: string 
  text: string 
  slug: string
  createdAt: string 
  updatedAt: string 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  s = Styles
  allPosts!: any

  constructor(
    public app: AppService,
    public apiPost: ApiPostService,
    public router: Router
  ) {}

  ngOnInit() {
    this.apiPost.getAll()
    .subscribe(res => this.allPosts = res)
  }

  onOpen(postId: number) {
    alert(`Open ${postId}`)
  }

  onEdit(post: postProps) {
    this.router.navigateByUrl(`/edit/${post.id}/${post.slug}`)
  }

  onDelete(postId: number) {
    alert(`Delete ${postId}`)
  }
}
