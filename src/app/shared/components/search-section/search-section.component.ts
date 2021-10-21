import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { TypesService } from '../../services/types.service';

@Component({
  selector: 'app-search-section',
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.scss']
})
export class SearchSectionComponent implements OnInit {
  categories$: Observable<Category[]>;
  types$;
  @Output() searchValues = new EventEmitter();
  @Input() hasClass = false;
  @Input() page: string;
  @Input() searchParams;
  constructor(
    private typesService: TypesService,
    private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getTypes();
  }
  getCategories(): void {
    this.categories$ = this.categoriesService.getCategories()
      .pipe(map(
        (result: object) => result['policy_categories']
      ));
  }

  getTypes(): void {
    this.types$ = this.typesService.getInsuranceTypes().pipe(map((result: object) => result['target_customers']));
  }

  search(event): void {
    this.searchValues.next({ ...event });
  }

}
