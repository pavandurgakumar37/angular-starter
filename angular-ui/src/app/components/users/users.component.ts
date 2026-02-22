import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {
    console.log('UsersComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('UsersComponent: ngOnInit called');
    this.loadUsers();
  }
  
  ngAfterViewInit(): void {
    console.log('UsersComponent: ngAfterViewInit called');
  }
  
  ngAfterContentChecked(): void {
    console.log('UsersComponent: ngAfterContentChecked called, isLoading:', this.isLoading, 'users.length:', this.users.length);
  }

  loadUsers(): void {
    console.log('UsersComponent: Loading data from API');
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('UsersComponent: Successfully received users data:', data);
        this.users = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('UsersComponent: Error loading users:', error);
        this.users = [];
        this.isLoading = false;
      }
    });
  }
}