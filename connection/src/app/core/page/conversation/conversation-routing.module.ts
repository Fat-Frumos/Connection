import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {GroupService} from '@app/core/service/group.service';
import {
  ConversationComponent
} from '@app/core/page/conversation/conversation.component';
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {LoaderComponent} from '@app/shared/component/loader/loader.component';
import {FormsModule} from '@angular/forms';


const routes: Routes = [
  {path: '', component: ConversationComponent}
];

@NgModule({
  declarations: [
    ConversationComponent],
  imports: [
    RouterModule.forChild(routes),
    NgForOf,
    NgClass,
    AsyncPipe,
    NgIf,
    LoaderComponent,
    DatePipe,
    FormsModule
  ],
  providers: [GroupService],
  exports: [RouterModule, ConversationComponent]
})
export class ConversationRoutingModule {
}
