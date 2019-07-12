import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import environment from 'src/environments/environment';
import { map, tap, concatMap } from 'rxjs/operators';
import { Channel } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  getChannels(): Observable<Channel> {
    return timer(0, 10000)
      .pipe(concatMap(() => this.httpClient.get(`${environment.backendUrl}/channels`)
        .pipe(map((response: any) => response._embedded.channels), tap(console.log))));
  }
}
