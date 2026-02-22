import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'angular-ui';
  
  constructor(private router: Router) {
    console.log('App component initialized');
    this.router.events.subscribe(event => {
      console.log('Router event:', event);
    });
  }
}
