import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import environment from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Channel } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpCLient: HttpClient) { }

  getChannels(): Observable<Channel> {
    return this.httpCLient.get(`${environment.backendUrl}/channels`)
      .pipe(map((response: any) => response._embedded.channels), tap(console.log))
  }
}
