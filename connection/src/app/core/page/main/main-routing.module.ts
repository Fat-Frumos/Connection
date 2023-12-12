import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainComponent} from '@app/core/page/main/main.component';
import {ToastComponent} from '@app/shared/component/toast/toast.component';
import {LoaderComponent} from '@app/shared/component/loader/loader.component';
import {MessageComponent} from '@app/core/component/message/message.component';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GroupComponent} from '@app/core/component/group/group.component';
import {PeopleComponent} from '@app/core/component/people/people.component';
import {GroupService} from '@app/core/service/group.service';

const routes: Routes = [
  {path: '', component: MainComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    GroupComponent,
    PeopleComponent,
    MessageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ToastComponent,
    LoaderComponent,
    NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[GroupService],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
