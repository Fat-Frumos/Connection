import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ToastMessage, ToastMessageType} from '@app/model/toast-message.model';

const delay = 500;

@Injectable()
export class ToastService {

  private subject = new Subject<ToastMessage>();

  toast$ = this.subject.asObservable();

  show(message: string, toastType: ToastMessageType): void {
    const color = this.getColor(toastType);
    this.subject.next({message, toastType, color} as ToastMessage);
  }

  clear(): void {
    setTimeout(() => {
      this.subject.next({} as ToastMessage);
    }, delay);
  }

  getColor(toastType: ToastMessageType): string {
    switch (toastType) {
      case 'info':
      case 'success':
        return 'green';
      case 'warning':
      case 'error':
        return 'red';
      default:
        return 'black';
    }
  }
}
