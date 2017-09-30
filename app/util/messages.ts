import { Injectable } from '@angular/core';
import { Fire } from './fire';

@Injectable()
export class Messages {
  firebase: any;
  user: any;

  constructor(fire: Fire){
    this.firebase = fire.getDB();
    this.user = fire.user
  }

  send(friend, message, position) {
    let ref = this.firebase.database().ref();

    return ref.child('messages').child(friend.id).push().set({
      senderId: this.user.id,
      senderName: this.user.name,
      senderPhoto: this.user.photo,
      message: message,
      lat: position.lat,
      lng: position.lng,
      address: position.address,
      read: false
    });
  }

  get(read: boolean, successCallback){
    let ref = this.firebase.database().ref('messages').child(this.user.id);

    ref.orderByChild('read').equalTo(read).on('child_added', (snapshot) => {
      let message = snapshot.val();
      message.key = snapshot.key;

      message.map =   "https://maps.googleapis.com/maps/api/staticmap?center=" +
        message.lat + ", " + message.lng +
        "&zoom=15&size=400x200" +
        "&markers=color:red%7Clabel:S%7C" +
        message.lat + ", " + message.lng +
        "&maptype=roadmap&key=AIzaSyD_HuClW54OgtcZuFFpf6bJuNwDfE6T8B8";
      message.photo = message.senderPhoto;
      successCallback(message);
    })
  }

  setMessageRead(message) {
    let updates = {};

    updates[`/messages/${this.user.id}/${message.key}/read`] = true;

    return this.firebase.database().ref().update(updates);
  }
}
