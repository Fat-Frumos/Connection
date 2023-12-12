import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ToastMessage, ToastMessageType} from '@app/model/toast-message.model';

const DELAY = 2000;

@Injectable()
export class ToastService {

  private subject = new Subject<ToastMessage>();

  toast$ = this.subject.asObservable();

  showMessage(message: string, toastType: ToastMessageType): void {
    const color = this.getColor(toastType);
    this.show({message, toastType, color} as ToastMessage);
  }

  clear(delay: number): void {
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

  show(toast: ToastMessage): void {
    this.subject.next(toast);
    this.clear(DELAY);
  }

  upload(countdown: number): boolean {
    const interval = setInterval(() => {
      countdown--;
      if (countdown === 0) {
        clearInterval(interval);
      }
    }, 1000);
    return false;
  }
}
