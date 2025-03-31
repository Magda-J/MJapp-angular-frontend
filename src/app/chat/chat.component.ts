import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  receiverId!: number;
  userId: string | null = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id'); 
    this.chatService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() && this.receiverId) {
      this.chatService.sendMessage(this.receiverId, this.newMessage).subscribe(() => {
        this.newMessage = '';
      });
    }
  }

  completeMessage(messageId: number) {
    this.chatService.completeMessage(messageId).subscribe();
  }
}
