import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-simple-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-users.component.html',
  styleUrl: './simple-users.component.css'
})
export class SimpleUsersComponent implements OnInit {
  users: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  apiUrl = '/api/users';
  componentStatus = 'Initialized';
  lastApiCall = 'Not yet called';

  constructor(private http: HttpClient) {
    console.log('SimpleUsersComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('SimpleUsersComponent: ngOnInit called');
    this.componentStatus = 'ngOnInit executed';
    this.loadUsers();
  }

  loadUsers(): void {
    console.log('SimpleUsersComponent: loadUsers called');
    this.componentStatus = 'Loading users...';
    this.isLoading = true;
    this.errorMessage = null;
    this.lastApiCall = new Date().toLocaleTimeString();
    
    console.log('SimpleUsersComponent: Making HTTP GET request to', this.apiUrl);
    
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('SimpleUsersComponent: HTTP request successful', data);
        this.users = data;
        this.isLoading = false;
        this.componentStatus = 'Data loaded successfully';
      },
      error: (error) => {
        console.error('SimpleUsersComponent: HTTP request failed', error);
        this.errorMessage = error.message || 'Unknown error';
        this.isLoading = false;
        this.componentStatus = 'Error occurred';
      }
    });
  }
}