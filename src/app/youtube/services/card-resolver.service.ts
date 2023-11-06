import {inject} from '@angular/core';
import {VideoItem} from '@app/youtube/models/video-item-model';
import {HttpClient} from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  ResolveFn, Router
} from '@angular/router';
import {catchError, map, of} from 'rxjs';

export const CardResolverService: ResolveFn<VideoItem | null> = (
  activatedRoute: ActivatedRouteSnapshot) => {
  const id = activatedRoute.paramMap.get('id') ?? '';
  const router = inject(Router);

  return inject(HttpClient)
    .get<VideoItem>(`/home/${id}`)
    .pipe(map((product: VideoItem | null) => {
      if (!product) {
        router.navigate(['/']).then(() => {
          console.log('Navigation has finished');
        }).catch((error) => {
          console.error('Navigation error', error);
        });
      }
      localStorage.setItem('product', JSON.stringify(product));
      return product;
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
