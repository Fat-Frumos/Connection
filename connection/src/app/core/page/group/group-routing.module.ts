import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ToastComponent} from '@app/shared/component/toast/toast.component';
import {LoaderComponent} from '@app/shared/component/loader/loader.component';
import {GroupComponent} from '@app/core/page/group/group.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {GroupService} from '@app/core/service/group.service';
import {
  ConversationComponent
} from '@app/core/page/conversation/conversation.component';


const routes: Routes = [
  {path: '', component: GroupComponent}
];

@NgModule({
  declarations: [
    ConversationComponent,
    GroupComponent],
  imports: [
    RouterModule.forChild(routes),
    ToastComponent,
    LoaderComponent,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    FormsModule
  ],
  providers: [GroupService],
  exports: [RouterModule]
})
export class GroupRoutingModule {
}
