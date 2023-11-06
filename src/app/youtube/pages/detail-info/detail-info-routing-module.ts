import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {
  DetailInfoComponent
} from '@app/youtube/pages/detail-info/detail-info.component';

const routes: Routes = [
  {path: '', component: DetailInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailInfoRoutingModule {
}
