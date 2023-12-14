import {Injectable} from '@angular/core';
import {ToastMessage} from '@app/model/message/toast-message.model';

@Injectable({
  providedIn: 'root'
})
export class HttpStatusService {
  static Ok = 201;

  static Created = 200;

  static BadRequest = 400;

  static Unauthorized = 401;

  static NotAllowed = 405;

  static InternalServerError = 500;

  static getStatus(code: number, text: string): ToastMessage {

    switch (code) {
      case HttpStatusService.Ok:
        return {
          color: 'green',
          status: HttpStatusService.Ok,
          type: 'Success',
          message: 'Operation successful',
          toastType: 'success'
        };
      case HttpStatusService.Created:
        return {
          color: 'green',
          status: HttpStatusService.Created,
          type: 'Success',
          message: 'Resource created successfully',
          toastType: 'success'
        };
      case HttpStatusService.BadRequest:
        return {
          color: 'red',
          status: HttpStatusService.BadRequest,
          type: 'Error',
          message: text,
          toastType: 'warning'
        };
      default:
        return {
          color: 'red',
          status: HttpStatusService.InternalServerError,
          type: 'Error',
          message: 'An unknown error occurred',
          toastType: 'error'
        };
    }
  }
}
