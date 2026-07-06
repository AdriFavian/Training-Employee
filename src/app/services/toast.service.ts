import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toastState = new Subject<ToastMessage | null>();

  show(text: string, type: 'success' | 'error' | 'info' = 'success') {
    this.toastState.next({ text, type });
    
    setTimeout(() => {
      this.toastState.next(null);
    }, 3000);
  }
}