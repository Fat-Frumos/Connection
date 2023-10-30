import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SearchComponent} from '@app/youtube/pages/main/search.component';

const routes: Routes = [
  {path: '', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
