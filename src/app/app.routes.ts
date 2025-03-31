import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
{
    pathMatch: 'full',
    redirectTo: 'login',
    path: ''
},
{ path: 'chat', 
component: ChatComponent },

{
    path: 'login',
    component: LoginComponent
},
{
    path: 'home',
    component: HomeComponent
},
{
    path: 'register',
    component: RegisterComponent
},
];
