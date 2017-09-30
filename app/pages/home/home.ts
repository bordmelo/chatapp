import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MessageNewPage } from '../message-new/message-new';
import { MessageReadPage } from '../message-read/message-read';
import { FriendsPage } from '../friends/friends';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  messageNew: any = MessageNewPage;
  messageRead: any = MessageReadPage;
  friends: any = FriendsPage;
}
