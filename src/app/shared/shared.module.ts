import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { SearchComponent } from './components/search/search.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';


import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchSectionComponent } from './components/search-section/search-section.component';
import { FormsetComponent } from './components/formset/formset.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsMenuComponent } from './components/products-menu/products-menu.component';
import { NewsletterformComponent } from './components/newsletterform/newsletterform.component';

@NgModule({
  declarations: [
    NavComponent,
    SearchComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    SearchSectionComponent,
    FormsetComponent,
    FooterComponent,
    ProductsMenuComponent,
    NewsletterformComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDividerModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    SearchComponent,
    DynamicFormComponent,
    SearchSectionComponent,
    FooterComponent,
    NewsletterformComponent,
    // modules
    MatDialogModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
