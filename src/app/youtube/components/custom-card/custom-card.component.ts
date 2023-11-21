import {Component, Input} from '@angular/core';
import {
  CustomCard
} from '@app/youtube/components/custom-card/custom-card-model';
import {Store} from '@ngrx/store';
import {deleteCustomCard} from '@app/redux/actions/custom-card.action';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss']
})
export class CustomCardComponent {

  @Input() customCard: CustomCard;

  constructor(private store: Store) {
    this.customCard = {} as CustomCard;
  }

  onDeleteClick(): void {
    this.store.dispatch(deleteCustomCard({id: this.customCard.id.videoId}));
  }
}
