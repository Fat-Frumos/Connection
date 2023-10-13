import {RouterModule, Routes} from '@angular/router';
import {
  BackofficeComponent
} from '@app/components/backoffice/backoffice.component';
import {NgModule} from '@angular/core';


const routes: Routes = [
  {
    path: '', component: BackofficeComponent,
    children: [
      {
        path: '', loadChildren: () => import('../search/search.module')
          .then(module => module.SearchModule)
      }
    ]
  }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule {
}
