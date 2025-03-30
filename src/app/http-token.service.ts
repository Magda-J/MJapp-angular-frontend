import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { from } from 'rxjs';

const baseURL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenService {

  constructor(private http: HttpClient, private router: Router) { }

  getCrsfToken() {
    return this.http.get<any>( `${baseURL}/sanctum/csrf-cookie`, {withCredentials:true})
  }

  login(email:string, password:string){ return this.http.post<any>(`${baseURL}/api/login`, {email, password}, {withCredentials:true})}
  getUser(){return this.http.get<any>(`${baseURL}/api/user`, {withCredentials:true})}

  register(data: any) {
    const headers = new HttpHeaders({
      'X-CSRF-TOKEN': localStorage.getItem('csrf_token') || ''
    });

    return this.http.post(`${baseURL}/api/register`, data, { headers });
  }

  logout() {
    return this.http.post(`${baseURL}/api/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        },
        error: err => console.error('Logout failed', err)
      });
  }

}
