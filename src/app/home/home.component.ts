import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpTokenService } from '../http-token.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styles: [`
    .home-container {
      text-align: center;
      margin-top: 50px;
    }
  `]
})
export class HomeComponent implements OnInit {
  errMessage!: string | null;
  user!: any | null;

  constructor(
    private svc: HttpTokenService,
    private router: Router
  ) {}

  logout() {
    this.svc.logout();
  }

  ngOnInit(): void {
   this.svc.getUser()
   .subscribe({
    next: res => this.user = res,
    error: err => this.errMessage = err.error ? err.error.message : 'An unknown error occurred.'
   })
  }
}
