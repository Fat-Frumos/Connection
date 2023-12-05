import {Component} from '@angular/core';
import {ToastComponent} from '@app/shared/component/toast/toast.component';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  imports: [
    ToastComponent
  ],
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
