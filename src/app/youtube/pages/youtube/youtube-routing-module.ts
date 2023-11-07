import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {FeatureModule} from '@app/shared/feature.module';
import {YoutubeComponent} from '@app/youtube/pages/youtube/youtube.component';
import {SharedModule} from '@app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: YoutubeComponent,
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
  imports: [
    SharedModule,
    FeatureModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YouTubeRoutingModule {
}
