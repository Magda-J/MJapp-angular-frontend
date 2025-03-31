import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private pusherClient: Pusher;
  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.pusherClient = new Pusher('0fc63344f517e9552c5b', {
      cluster: 'eu',
      authEndpoint: 'http://localhost:8000/api/pusher/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        }
      }
    });

    this.listenForMessages();
  }

  sendMessage(receiverId: number, content: string) {
    return this.http.post('http://localhost:8000/api/messages', { receiver_id: receiverId, content });
  }

  completeMessage(messageId: number) {
    return this.http.patch(`http://localhost:8000/api/messages/${messageId}/complete`, {});
  }

  listenForMessages() {
    const channel = this.pusherClient.subscribe(`private-messages.${localStorage.getItem('user_id')}`);
    
    channel.bind('MessageSent', (message: any) => {
      this.messagesSubject.next([...this.messagesSubject.value, message]);
    });
  }
}
