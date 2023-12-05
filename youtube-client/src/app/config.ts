import {environment} from '../environments/environment';
import {InjectionToken} from '@angular/core';

export const keyApi: string = environment.keyApi;
export const baseUrl: string = environment.baseUrl;
export const itemSize: number = environment.itemSize;
export const KEY_URL_TOKEN: InjectionToken<string> = new InjectionToken('KEY_URL_TOKEN');
export const ITEM_SIZE_TOKEN: InjectionToken<string> = new InjectionToken('ITEM_SIZE_TOKEN');
export const BASE_URL_TOKEN: InjectionToken<string> = new InjectionToken('BASE_URL_TOKEN');
