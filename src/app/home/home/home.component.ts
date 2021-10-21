import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { TypesService } from 'src/app/shared/services/types.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories$: Observable<Category[]>;
  types$: Observable<any>;
  types = ['Family', 'Individual'];

  constructor(
    private router: Router,
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

  search(filterValues): void {
    let queryParams;
    delete filterValues['created_at'];
    delete filterValues['type'];
    Object.keys(filterValues).forEach(key => {
      if (filterValues[key]) {
        queryParams = { ...queryParams, [key]: filterValues[key] };
      }
    });
    this.router.navigate(['home/questionnaire'], { queryParams });
  }

}
