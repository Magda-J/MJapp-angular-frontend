import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpTokenService } from './http-token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'MJapp';

  constructor(private httpClient: HttpClient) {}

  $tokenSvc = inject(HttpTokenService);

  ngOnInit(): void {

    this.httpClient.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    }).subscribe(() => {
    });
  }
}
