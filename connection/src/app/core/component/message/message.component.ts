import {
  Component,
  inject,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {Message} from '@app/model/message/message.model';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '@app/core/service/group.service';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {RouterService} from '@app/auth/service/router.service';
import {timer} from 'rxjs';
import {ErrorMessage} from '@app/model/message/error-message.model';
import {ConversationId} from '@app/model/conversation/conversation.models';

const MINUTE = 60000;

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MessageComponent implements OnInit {

  @Input() currentUserName: string = '';

  conversationID: string = '';

  messages: Message[];

  countdown: number | null = null;

  lastUpdate: number = 0;

  since = this.service.since;

  updateDisabled = false;

  http: HttpClient = inject(HttpClient);

  messageForm = this.fb.group({
    message: ['', [Validators.required.bind(Validators)]]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: RouterService,
    private service: GroupService) {
    this.messages = [];
  }

  updateMessages(): void {
    this.updateDisabled = true;
    this.countdown = 60;
    const countdownInterval = timer(0, 1000).subscribe(() => {
      if (this.countdown && this.countdown > 0) {
        this.countdown--;
      } else {
        this.updateDisabled = false;
        countdownInterval.unsubscribe();
      }
    });
    setTimeout(() => {
      this.loadMessages();
    }, MINUTE);
  }

  sendMessage(): void {
    if (this.messageForm.valid) {
      this.updateDisabled = true;
      this.create();
      this.send();
    }
  }

  private create() {
    const lastMessageTimestamp = this.getLastMessageTimestamp() || 0;
    this.service.getMessages(this.conversationID, lastMessageTimestamp).subscribe(
      (response) => {
        this.messages = [...this.messages, ...response.Items];
        this.updateDisabled = false;
      },
      (error: ErrorMessage) => {
        console.error('Error updating messages:', error);

        if (error.status === 400 && error.error?.type === 'InvalidIDException') {
          this.createConversationAndLoadMessages();
        } else if (error.status === 400 && error.error?.type === 'DuplicationNotAllowedException') {
          this.loadMessages();
        } else {
          this.updateDisabled = false;
        }
      }
    );
  }

  private send() {
    const messageControl = this.messageForm.get('message');
    if (messageControl) {
      const message: string = messageControl.value as string;

      if (this.conversationID && message) {
        this.service.sendNewMessage(this.conversationID, message).subscribe(
          () => {
            this.getMessages(this.lastUpdate);
            this.messageForm.reset();
          },
          (error) => {
            console.error('Error sending new message:', error);
          }
        );
      } else {
        console.error('Invalid groupId or message.');
      }
    }
  }

  private createConversationAndLoadMessages(): void {
    this.service.createConversation(this.conversationID).subscribe(
      (response: ConversationId) => {
        this.conversationID = response.conversationID;
        this.loadMessages();
      },
      (error: ErrorMessage) => {
        console.error('Error creating conversation:', error);

        console.log(this.conversationID);
        console.log(this.since);
        if (error.status === 400 && error.error?.type === 'DuplicationNotAllowedException') {

          this.loadMessages();
        } else {
          this.updateDisabled = false;
        }
      }
    );
  }


  private loadMessages(): void {
    this.service.getMessages(this.conversationID).subscribe(
      (response) => {
        this.messages = response.Items;
      },
      (error) => {
        console.error('Error loading messages:', error);
        this.updateDisabled = false;
      }
    );
  }


  private getLastMessageTimestamp(): number | null {
    const lastMessage = this.messages[this.messages.length - 1];
    return lastMessage ? +lastMessage.createdAt.S : null;
  }


  deleteConversation(): void {
    const confirmDelete = confirm('Are you sure you want to delete this conversation?');
    if (confirmDelete) {
      this.service.deleteConversation(this.conversationID).subscribe(
        () => {
          void this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error deleting conversation:', error);
          void this.router.navigate(['/']);
        }
      );
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.conversationID = params['id'] as string;
      this.getGroupDetails(this.conversationID);
    });
    this.getMessages();
  }

  getMessages(since?: number): Message[] {
    this.service.getMessages(this.conversationID, since).subscribe(response => {
      if (response.Items) {
        this.messages.push(...response.Items);
      }
      this.lastUpdate = Date.now();
    });
    return this.messages;
  }

  private getGroupDetails(groupID: string): void {
    this.service.getMessages(groupID, 1).subscribe(
      (group) => {
        this.messages = group.Items;
      });
  }
}
