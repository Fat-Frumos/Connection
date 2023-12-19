import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainComponent} from '@app/core/page/main/main.component';
import {ToastComponent} from '@app/shared/component/toast/toast.component';
import {LoaderComponent} from '@app/shared/component/loader/loader.component';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GroupComponent} from '@app/core/component/group/group.component';
import {PeopleComponent} from '@app/core/component/people/people.component';
import {ChatComponent} from '@app/core/component/chat/chat.component';
import {MessageModule} from '@app/core/component/message/message.module';

const routes: Routes = [
  {path: '', component: MainComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    ChatComponent,
    GroupComponent,
    PeopleComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    ToastComponent,
    LoaderComponent,
    NgForOf,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    DatePipe,
    NgClass,
    MessageModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
