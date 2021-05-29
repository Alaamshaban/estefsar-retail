import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  @Input() categories$;
  @Input() types$;
  @Output() updateSearch = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.searchForm = this.fb.group({
      type: [''],
      start_date: [''],
      category: ['']
    });
  }

  search(): void {
    this.updateSearch.next({ ...this.searchForm.value });
  }

}