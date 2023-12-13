import { ComponentFixture, TestBed } from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import { ConversationComponent } from '@app/core/page/conversation/conversation.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastService} from '@app/shared/component/toast/toast.service';

describe('GroupComponent', () => {
  let component: ConversationComponent;
  let fixture: ComponentFixture<ConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationComponent],
      providers:[ToastService],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
