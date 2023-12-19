import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {People} from '@app/model/user/user-profile-response.model';
import {BehaviorSubject, of, Subject, tap} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Message} from '@app/model/message/message.model';
import {GroupService} from '@app/core/service/group.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {catchError} from 'rxjs/operators';
import {ErrorMessage} from '@app/model/message/error-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {

  @ViewChild('scrollContainer', {static: true}) scrollContainer!: ElementRef<HTMLDivElement>;

  users: BehaviorSubject<People[]> = new BehaviorSubject<People[]>([]);

  private subject = new Subject<void>();

  @Input() selectedUserId: string = '';

  conversationID: string = '';

  newMessageForm: FormGroup;

  messages: Message[] = [];

  constructor(
    private service: GroupService,
    private toast: ToastService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.newMessageForm = this.fb.group({
      message: ['', Validators.required.bind(Validators)]
    });
  }

  ngOnInit(): void {
    this.conversationID = localStorage.getItem('cid') ?? '';
    this.fetchMessages(this.conversationID);
    this.service.getPeople$().subscribe(people =>
      this.users.next(people.Items));
  }


  fetchMessages(conversationID: string): void {
    this.service.getConversationMessages(conversationID).pipe(
      tap((data) => {
        this.messages = data.Items;
      }),
      catchError((error: ErrorMessage) => {
        this.toast.showMessage(error.message, 'error');
        return of(null);
      })
    ).subscribe();
  }

  get message() {
    return this.newMessageForm?.get('message');
  }

  onSelectConversation(id: string) {
    if (this.newMessageForm?.invalid) {
      return;
    }
    let message = '';
    if (this.newMessageForm?.value) {
      message = (this.newMessageForm.value as { message: string }).message;
    }
    this.service.sendNewMessage(id, message);
    void this.router.navigate(['/', 'conversation', id]);
  }

  ngOnDestroy() {
    this.subject.next();
    this.subject.complete();
  }
}
