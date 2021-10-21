import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokerComponent } from './broker/broker.component';
import { ProviderComponent } from './provider/provider.component';

const routes: Routes = [
  {
  path: 'broker',
  component: BrokerComponent
},
{
  path: 'provider',
  component: ProviderComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
