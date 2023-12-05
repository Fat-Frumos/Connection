import {TestBed} from '@angular/core/testing';
import {beforeEach, describe, expect, it} from '@jest/globals';
import {StorageService} from '@app/youtube/services/storage.service';
import {User} from '@app/auth/models/user';
import {user, videoItem} from '@app/spec/interface/model';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and get video', () => {
    service.saveVideo(videoItem);

    const storedVideo = service.getVideo();
    expect(storedVideo).toEqual(videoItem);
  });

  it('should login and get user', () => {
    service.login(user);

    const storedUser = service.getUser();
    expect(storedUser).toEqual(user);
  });

  it('should logout', () => {
    service.logout();

    const storedUser = service.getUser();
    expect(storedUser).toEqual({} as User);
  });
});
