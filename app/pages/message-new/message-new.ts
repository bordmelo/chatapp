import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Messages } from '../../util/messages';
import { MessageViewPage } from '../message-view/message-view';

/*
  Generated class for the MessageNewPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/message-new/message-new.html',
})
export class MessageNewPage {

  messageList: any = [];

  constructor(private navController: NavController, private messages: Messages) {
    this.initPage();
  }

  private initPage(){
    this.messages.get(false, message =>{
      this.messageList.push(message);
    });

  }

  openMessage(message) {
    this.navController.push(MessageViewPage, { message });
    this.messages.setMessageRead(message).then(() => this.removeMessageFromList(message));
  }

  private removeMessageFromList(message) {
    let index = this.messageList.indexOf(message);

    if (index >= 0){
      this.messageList.splice(index,1);
    }
  }
}
