import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/dto';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  constructor(private chatService: ChatService, private route: ActivatedRoute) { }

  channelId: string;
  messages = [];
  private channelSubscription;

  async ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.channelId = params.get('id');
    this.channelSubscription = this.chatService.joinChannel(this.channelId).subscribe(message => {
      console.log(message);
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    if (this.channelSubscription) {
      this.channelSubscription.unsubscribe();
    }
  }

  sendMessage(message) {
    this.chatService.sendMessage(this.channelId, message.body);
  }

}
