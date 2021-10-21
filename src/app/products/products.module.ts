import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { BrokerComponent } from './broker/broker.component';
import { ProviderComponent } from './provider/provider.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BrokerComponent,
    ProviderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
