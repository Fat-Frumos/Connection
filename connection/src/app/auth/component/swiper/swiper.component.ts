import {Component, inject} from '@angular/core';
import {RouterService} from '@app/auth/service/router.service';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss'
})
export class SwiperComponent {
  private router = inject(RouterService);

  togglePanels(isSignUp: boolean): void {
    const container = document.querySelector('.container');
    if (container) {
      this.router.togglePanels(isSignUp, container);
    }
  }
}
