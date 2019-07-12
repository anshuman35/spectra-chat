import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  channels$ = this.chatService.getChannels();

  constructor(private breakpointObserver: BreakpointObserver, private authService:AuthService, private router:Router, private chatService:ChatService) {}

  logOut() {
    console.log('Logging out');
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
