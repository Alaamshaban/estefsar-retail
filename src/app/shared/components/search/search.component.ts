import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import * as moment from 'moment';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  @Input() categories$: Observable<Category>;
  @Input() types;
  @Output() updateSearch = new EventEmitter();

  constructor(
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.searchForm = this.fb.group({
      type: [null],
      created_at: [null],
      policy_category: [null],
      content_type: ['TN']
    });
  }

  search(): void {
    if(this.searchForm.get('created_at').value){
      this.searchForm.patchValue({
        created_at: moment(this.searchForm.get('created_at').value).format('YYYY-MM-DD HH:mm:ss')
      });
    }
    this.updateSearch.next({ ...this.searchForm.value });
  }

}
