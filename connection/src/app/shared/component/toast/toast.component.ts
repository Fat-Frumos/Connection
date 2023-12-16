import {Component} from '@angular/core';
import {ToastMessage} from '@app/model/message/toast-message.model';
import {NgIf} from '@angular/common';
import {ToastService} from '@app/shared/component/toast/toast.service';

@Component({
  imports: [NgIf],
  standalone: true,
  selector: 'app-toast',
  styleUrl: './toast.component.scss',
  templateUrl: './toast.component.html'
})
export class ToastComponent {

  message: ToastMessage = {} as ToastMessage;

  constructor(private service: ToastService) {
    this.service.toast$.subscribe(message => {
      this.message = message;
    });
  }

  closeModal() {
    this.service.clear();
  }
}
