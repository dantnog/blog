import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Styles } from 'src/app/app.styles';
import { ApiPostService } from 'src/app/services/api-post.service';

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
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  s = Styles
  post!: PostProps

  constructor(
    public app: AppService,
    private apiPost: ApiPostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = Number(this.route.snapshot.paramMap.get('id'))

    this.apiPost.getOne(idParam)
    .subscribe(res => {
      this.post = res
    })
  }

  onEdit() {
    this.router.navigateByUrl(`/edit/${this.post.id}/${this.post.slug}`)
  }

  onDelete() {
    alert(`Delete ${this.post.id}`)
  }

  wasUpdated() {
    if (this.post.updatedAt.split('T')[0] > this.post.createdAt.split('T')[0]) {
      return true
    } else {
      return false
    }
  }
}
