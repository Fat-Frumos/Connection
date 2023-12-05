export interface ErrorMessage {
  error: { message: string, type: string };
  headers: { lazyInit: string, lazyUpdate: string, normalizedNames: string };
  message: string;
  name: string;
  ok: string;
  status: number;
  statusText: string;
  url: string;
}
