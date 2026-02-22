import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="test-container">
      <h2>Test Component</h2>
      <p>This is a simple test component to verify Angular is working.</p>
      <p>Component initialized at: {{ initializationTime }}</p>
      <p>Counter: {{ counter }}</p>
      <button (click)="incrementCounter()">Increment Counter</button>
      <div class="navigation-links">
        <a routerLink="/users">Go to Users</a> |
        <a routerLink="/products">Go to Products</a>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin: 20px;
      background-color: #f9f9f9;
    }
    .navigation-links {
      margin-top: 20px;
    }
    .navigation-links a {
      margin: 0 10px;
    }
  `]
})
export class TestComponent implements OnInit {
  initializationTime: string;
  counter = 0;

  constructor() {
    console.log('TestComponent: Constructor called');
    this.initializationTime = new Date().toLocaleTimeString();
  }

  ngOnInit(): void {
    console.log('TestComponent: ngOnInit called');
  }

  incrementCounter(): void {
    this.counter++;
    console.log('TestComponent: Counter incremented to', this.counter);
  }
}