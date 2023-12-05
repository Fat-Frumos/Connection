export interface ToastMessage {
  message: string;
  type: string;
  color: string;
  status: number;
  toastType: ToastMessageType;
}

export type ToastMessageType = 'info' | 'success' | 'warning' | 'error';
