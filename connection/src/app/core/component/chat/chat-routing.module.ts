import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ToastComponent} from '@app/shared/component/toast/toast.component';
import {LoaderComponent} from '@app/shared/component/loader/loader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {GroupService} from '@app/core/service/group.service';
import {ChatComponent} from '@app/core/component/chat/chat.component';


const routes: Routes = [
  {path: '', component: ChatComponent}
];

@NgModule({
  declarations: [
    ChatComponent],
  imports: [
    RouterModule.forChild(routes),
    ToastComponent,
    LoaderComponent,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    AsyncPipe
  ],
  providers: [GroupService],
  exports: [RouterModule]
})
export class ChatRoutingModule {
}
