import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BackofficeModule} from './components/backoffice/backoffice.module';
import {PreloadService} from './shared/service/preload.service';

const routes: Routes = [
  {path: '', redirectTo: 'backoffice', pathMatch: 'full'},
  {
    path: '',
    loadChildren: () => import('./components/backoffice/backoffice.module')
      .then(module => module.BackofficeModule),
    data: { preload: true }
  },
  {
    path: '',
    loadChildren: () => import('./components/backoffice/backoffice.module')
      .then(module => module.BackofficeModule)
  },
  {path: '**', redirectTo: 'backoffice'}
];

@NgModule({
  imports: [
    BackofficeModule,
    RouterModule.forRoot(routes,
      {preloadingStrategy: PreloadService})],
  exports: [RouterModule],
  providers: [PreloadService]
})
export class AppRoutingModule {
}
