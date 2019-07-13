import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './components/shell/shell.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { ChatWindowComponent } from './components/chat/chat-window/chat-window.component';
import { EmptyComponent } from './components/chat/empty/empty.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'messages'
  },
  {
    path: 'messages',
    pathMatch: 'prefix',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EmptyComponent,
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: ChatWindowComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
