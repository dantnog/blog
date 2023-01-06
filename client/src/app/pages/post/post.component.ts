import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Styles } from 'src/app/app.styles';
import { host } from 'src/app/services/api-host';
import { ApiPostService } from 'src/app/services/api-post.service';

interface PostProps {
  id: number 
  title: string 
  desc: string 
  text: string 
  slug: string
  image: string
  createdAt: string 
  updatedAt: string 
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  host = host
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
      console.log(res)
    })
  }

  onEdit() {
    this.router.navigateByUrl(`/edit/${this.post.id}/${this.post.slug}`)
  }

  onDelete() {
    this.apiPost.delete(this.post.id)
    .subscribe(res => {
      this.redirect()
    })
  }

  redirect() {
    this.router.navigate(['/'])
  }

  wasUpdated() {
    if (this.post.updatedAt.split('T')[0] > this.post.createdAt.split('T')[0]) {
      return true
    } else {
      return false
    }
  }
}
