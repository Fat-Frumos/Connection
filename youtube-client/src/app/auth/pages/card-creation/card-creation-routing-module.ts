import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {
  CardCreationComponent
} from '@app/auth/pages/card-creation/card-creation.component';

const routes: Routes = [
  {path: '', component: CardCreationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardCreationRoutingModule {
}
