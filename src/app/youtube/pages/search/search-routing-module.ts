import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SearchComponent} from '@app/youtube/pages/search/search.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: 'main/:id',
        loadChildren: () => import('@app/youtube/pages/detail-info/detail-info.module')
          .then(module => module.DetailInfoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
