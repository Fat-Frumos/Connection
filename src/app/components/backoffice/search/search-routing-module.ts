import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SearchComponent} from '@app/components/backoffice/search/search.component';

const routes: Routes = [
  {path: '', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
