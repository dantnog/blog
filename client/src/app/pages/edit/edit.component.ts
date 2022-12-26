import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Styles } from 'src/app/app.styles';
import { ApiPostService } from 'src/app/services/api-post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  s = Styles
  postForm!: FormGroup
  idParam!: number

  constructor(
    private apiPost: ApiPostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idParam = Number(this.route.snapshot.paramMap.get('id'))
    
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100) 
      ]),
      desc: new FormControl('', [
        Validators.required,
        Validators.maxLength(180) 
      ]),
      text: new FormControl('', [
        Validators.required,
        Validators.maxLength(2000) 
      ]),
    })

    this.apiPost.getOne(this.idParam)
    .subscribe(res => {
      this.postForm.setValue({
        title: res.title,
        desc: res.desc,
        text: res.text
      })
    })
  }

  get title() { return this.postForm.get('title')! }
  get desc() { return this.postForm.get('desc')! }
  get text() { return this.postForm.get('text')! }
  
  async onSubmit() {
    this.apiPost.update(this.postForm, this.idParam)
    .pipe(
      catchError(err => {
        console.error(err)
        return throwError('ERROR')
      })
    )
    .subscribe(res => {
      console.log(res)
      this.router.navigate(['/'])
    })
  }
}
