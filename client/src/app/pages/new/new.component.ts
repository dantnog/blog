import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Styles } from 'src/app/app.styles';
import { ApiPostService } from 'src/app/services/api-post.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
})
export class NewComponent implements OnInit {
  s = Styles
  postForm!: FormGroup

  constructor(
    private apiPost: ApiPostService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      image: new FormControl('', [
        Validators.required
      ]),
    })
  }

  get title() { return this.postForm.get('title')! }
  get desc() { return this.postForm.get('desc')! }
  get text() { return this.postForm.get('text')! }
  get image() { return this.postForm.get('image')! }
  
  onChangeImage(image: any) {
    image = image.files[0]
    this.postForm.setValue({
      title: this.postForm.get('title')?.value,
      desc: this.postForm.get('desc')?.value,
      text: this.postForm.get('text')?.value,
      image: image,
    })
  }

  async onSubmit() {
    await this.apiPost.create(this.postForm)
      .pipe(
        catchError(err => {
          console.error(err)
          return throwError('error')
        })
      )
      .subscribe(res => {
        console.log(res)
        this.router.navigate(['/'])
      })
  }
}
