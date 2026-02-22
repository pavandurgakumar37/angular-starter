import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-working',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px;">
      <h1>TEST PAGE</h1>
      <p>If you can see this, Angular is working!</p>
      <p>Current time: {{ currentTime }}</p>
      <button (click)="testClick()">Test Button</button>
      <p *ngIf="clicked">Button was clicked!</p>
    </div>
  `,
  styles: [`
    :host { display: block; padding: 20px; }
  `]
})
export class TestWorkingComponent {
  clicked = false;
  currentTime = '';

  constructor() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime(): void {
    this.currentTime = new Date().toLocaleString();
  }

  testClick(): void {
    this.clicked = true;
    console.log('Test button clicked!');
  }
}