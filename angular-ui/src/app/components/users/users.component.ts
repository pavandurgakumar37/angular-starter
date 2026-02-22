import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isLoading = false;
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
    console.log('UsersComponent: Loading dummy data immediately');
    this.users = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1-555-0101' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1-555-0102' },
      { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '+1-555-0103' },
      { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', phone: '+1-555-0104' },
      { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', phone: '+1-555-0105' }
    ];
    console.log('UsersComponent: Dummy data loaded, users:', this.users);
  }
}