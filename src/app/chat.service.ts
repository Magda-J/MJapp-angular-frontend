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
  private notificationsSubject = new BehaviorSubject<string | null>(null);
  notifications$ = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient) {
    Pusher.logToConsole = true;
    this.pusherClient = new Pusher('0fc63344f517e9552c5b', {
      cluster: 'eu',
      authEndpoint: 'http://localhost:8000/api/pusher/auth', 
      auth: {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`
        }
      }
    });

    const userId = sessionStorage.getItem('user_id');
    if (userId) {
 
      const channel = this.pusherClient.subscribe(`private-messages.${userId}`);

      channel.bind('MessageApproved', (message: any) => {
        console.log('Message Approved:', message);
        this.notificationsSubject.next(`Your message "${message.content}" has been approved!`);
      });

    }
  }

  sendMessage(receiverId: number, content: string) {
    return this.http.post('http://localhost:8000/api/messages', { receiver_id: receiverId, content });
  }

  completeMessage(messageId: number) {
    return this.http.patch(`http://localhost:8000/api/messages/${messageId}/complete`, {});
  }
}
