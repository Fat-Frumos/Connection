import {NgModule} from '@angular/core';
import {YoutubeComponent} from '@app/youtube/pages/youtube/youtube.component';
import {
  YouTubeRoutingModule
} from '@app/youtube/you-tube-routing-module';
import {CoreModule} from '@app/youtube/core.module';
import {HeaderModule} from '@app/core/components/header/header.module';
import {AsyncPipe} from '@angular/common';
import {FooterComponent} from '@app/core/components/footer/footer.component';

@NgModule({
  declarations: [
    YoutubeComponent,
    FooterComponent
  ],
  exports: [
    YoutubeComponent
  ],
  imports: [
    YouTubeRoutingModule,
    CoreModule,
    HeaderModule,
    AsyncPipe
  ]
})
export class YouTubeModule {
}
