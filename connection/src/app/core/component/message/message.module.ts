import {NgModule} from '@angular/core';
import {MessageComponent} from '@app/core/component/message/message.component';
import {GroupService} from '@app/core/service/group.service';
import {RouterModule} from '@angular/router';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    MessageComponent],
  providers: [GroupService],
  imports: [
    NgForOf,
    NgClass,
    DatePipe,
    NgIf,
    ReactiveFormsModule
  ],
  exports: [RouterModule, MessageComponent]
})
export class MessageModule {
}
