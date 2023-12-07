import {Component, ViewEncapsulation} from '@angular/core';
import {ToastMessage} from '@app/model/toast-message.model';
import {NgIf} from '@angular/common';
import {ToastService} from '@app/shared/component/toast/toast.service';

@Component({
  imports: [NgIf],
  standalone: true,
  selector: 'app-toast',
  styleUrl: './toast.component.scss',
  templateUrl: './toast.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent {

  message = {} as ToastMessage;

  constructor(private service: ToastService) {
    this.service.toast$.subscribe(message => {
      this.message = message;
    });
  }

  closeModal() {
    this.service.clear(500);
  }
}
