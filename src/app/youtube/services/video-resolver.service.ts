import {inject} from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {HttpClient} from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  ResolveFn, Router
} from '@angular/router';
import {catchError, map, of} from 'rxjs';

export const VideoResolverService: ResolveFn<VideoItem | null> = (
  activatedRoute: ActivatedRouteSnapshot) => {
  const id = activatedRoute.paramMap.get('id') ?? '';
  const router = inject(Router);

  return inject(HttpClient)
    .get<VideoItem>(`/main/${id}`)
    .pipe(map((video: VideoItem | null) => {
      if (!video) {
        router.navigate(['/']).then(() => {
          console.log('Navigation has finished');
        }).catch((error) => {
          console.error('Navigation error', error);
        });
      }
      localStorage.setItem('video', JSON.stringify(video));
      return video;
    }),
    catchError(() => {
      router.navigate(['/']).then(() => {
        console.log('Navigation has finished');
      }).catch((error) => {
        console.error('Navigation error', error);
      });
      return of(null);
    })
    );
};
