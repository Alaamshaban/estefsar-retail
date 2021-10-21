import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewsModel } from '../../models/news.model';

@Component({
  selector: 'app-newsletterform',
  templateUrl: './newsletterform.component.html',
  styleUrls: ['./newsletterform.component.scss']
})
export class NewsletterformComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { }
  @Input() news: NewsModel[];
  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.form = this.fb.group({
      mail: [null]
    });
  }

}
