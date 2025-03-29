import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpTokenService } from '../http-token.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  credentials = { email: '', password: '' };


  errMessage!:string | null
  loginForm!: FormGroup

  constructor(
   private svc:HttpTokenService,
    private router:Router,
    private fb:FormBuilder

  ){}

  ngOnInit(): void {
   this.loginForm = this.fb.group({
    email:[''],
    password:['']
   })
  }

  onSubmit(){
    let {email,password} = this.loginForm.value
    this.svc.login(email,password)
    .subscribe({
      next: res => this.router.navigate(['/home']),
      error: err => this.errMessage = err
    })
  }
}
