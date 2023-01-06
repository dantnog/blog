import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Styles } from 'src/app/app.styles';
import { ApiPostService } from 'src/app/services/api-post.service';
import { Router } from '@angular/router';
import { host } from '../../services/api-host';

interface PostProps {
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
  host = host
  s = Styles
  allPosts!: any

  constructor(
    public app: AppService,
    public apiPost: ApiPostService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.apiPost.getAll()
    .subscribe(res => this.allPosts = res)
  }

  onOpen(post: PostProps): void {
    this.router.navigateByUrl(`/post/${post.id}/${post.slug}`)
  }

  onEdit(post: PostProps): void {
    this.router.navigateByUrl(`/edit/${post.id}/${post.slug}`)
  }

  onDelete(id: number): void {
    this.apiPost.delete(id)
    .subscribe(res => {
      this.allPosts = res
      console.log(res)
    })
  }

  lastModification(post: PostProps): string {
    if (post.createdAt.split('T')[0] > post.updatedAt.split('T')[0] ) {
      return post.createdAt.split('T')[0]
    } else {
      return post.updatedAt.split('T')[0]
    }
  }
}
