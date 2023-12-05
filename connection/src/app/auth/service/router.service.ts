import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  delay: number;

  constructor(private router: Router) {
    this.delay = 500;
  }

  togglePanels(isSignUp: boolean, container: Element): void {
    if (isSignUp) {
      container.classList.add('right-panel-active');
      setTimeout(() => {
        void this.router.navigate(['/signup']);
      }, this.delay);
    } else {
      container.classList.remove('right-panel-active');
      setTimeout(() => {
        void this.router.navigate(['/signin']);
      }, this.delay);
    }
  }

  navigate(path: string[]) {
    void this.router.navigate(path);
  }
}
