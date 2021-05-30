import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories$: Observable<Category[]>;
  types = ['Family', 'Individual'];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categories$ = this.categoriesService.getCategories()
      .pipe(map(
        (result: object) => result['policy_categories']
      ));
  }

}
