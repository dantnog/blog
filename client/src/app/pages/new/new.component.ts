import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Styles } from 'src/app/app.styles';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
})
export class NewComponent implements OnInit {
  s = Styles
  postForm!: FormGroup

  constructor() {}

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
    })
  }

  get title() { return this.postForm.get('title')! }
  get desc() { return this.postForm.get('desc')! }
  get text() { return this.postForm.get('text')! }
  

  onSubmit() {
    alert(this.postForm?.value.title)
  }
}
