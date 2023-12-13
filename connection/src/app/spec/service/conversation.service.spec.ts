import { TestBed } from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import { ConversationService } from '@app/core/service/conversation.service';

describe('ConversationService', () => {
  let service: ConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
