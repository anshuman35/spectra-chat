import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {

  @Output() onSendMessage = new EventEmitter();

  message = "Hello!";

  constructor() { }

  ngOnInit() {
  }

  sendMessage() {
    this.onSendMessage.emit({
      type: 'message',
      body: this.message
    });
  }

}
