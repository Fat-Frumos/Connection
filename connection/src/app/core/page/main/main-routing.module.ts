import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainComponent} from '@app/core/page/main/main.component';
import {ToastComponent} from '@app/shared/component/toast/toast.component';
import {LoaderComponent} from '@app/shared/component/loader/loader.component';


const routes: Routes = [
  {path: '', component: MainComponent}
];

@NgModule({
  declarations:[MainComponent],
  imports: [
    RouterModule.forChild(routes),
    ToastComponent,
    LoaderComponent
  ],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
