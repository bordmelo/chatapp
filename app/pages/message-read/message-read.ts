import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Messages } from '../../util/messages';
import { MessageViewPage } from '../message-view/message-view';

@Component({
  templateUrl: 'build/pages/message-read/message-read.html',
})
export class MessageReadPage {

  messageList: any = [];

  constructor(private navController: NavController, private messages: Messages) {
    this.initPage();
  }

  private initPage(){
    this.messages.get(true, message =>{
      this.messageList.push(message);
    });

  }

  openMessage(message) {
    this.navController.push(MessageViewPage, { message });
  }
}
