import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ByCountySearchComponent } from './components/by-county-search/by-county-search.component';

const routes: Routes = [
  {
    component : ByCountySearchComponent,
    path : 'form'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
