import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, fromEvent } from 'rxjs';
import environment from 'src/environments/environment';
import { map, tap, concatMap, filter } from 'rxjs/operators';
import { Channel } from '../dto';
import { RxStompService } from '@stomp/ng2-stompjs';
import { AuthService } from './auth.service';
import { connect, Socket } from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = connect(environment.stompBrokerUrl);

  private channels = new Map<string, Channel>();

  private message$ = fromEvent(this.socket, 'message').pipe(map((m: any) => ({
    ...m,
    senderType: m.user.id === this.authService.getCurrentUser().id ? 'local' : 'remote'
  })), tap(m => console.log('message', m)));

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.socket.emit('login', authService.getCurrentUser());
  }

  getChannels(): Observable<Channel> {
    return timer(0, 10000)
      .pipe(concatMap(() => this.httpClient.get(`${environment.backendUrl}/channels`)
        .pipe(map((response: any) => response._embedded.channels), tap(channels => {
          this.channels.clear();
          channels.forEach(channel => this.channels.set(channel.name, channel))
        }))));
  }

  getChannel(name: string) {
    return this.channels.get(name);
  }

  joinChannel(channel: string) {
    this.socket.emit('join', channel);
    return this.message$.pipe(filter((m: any) => m.channel === channel));
  }

  leaveChannel(channel: string) {
    this.socket.emit('leave', channel);
  }

  sendMessage(channel: string, content: any) {
    this.socket.emit('message', { channel, content });
  }
}
