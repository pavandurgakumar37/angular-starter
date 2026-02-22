import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-simple-users-working',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Users</h2>
      <div *ngIf="isLoading">Loading users...</div>
      <div *ngIf="users && users.length > 0">
        <p>Found {{ users.length }} users:</p>
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    table { margin-top: 20px; }
    th, td { padding: 8px; border: 1px solid #ddd; }
    th { background-color: #f2f2f2; }
  `]
})
export class SimpleUsersWorkingComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  private dataLoaded = false;

  constructor(private http: HttpClient) {
    console.log('SimpleUsersWorkingComponent: Constructor');
  }

  ngOnInit(): void {
    console.log('SimpleUsersWorkingComponent: ngOnInit - loading users');
    if (!this.dataLoaded) {
      this.loadUsers();
    }
  }

  loadUsers(): void {
    console.log('SimpleUsersWorkingComponent: Loading users from API');
    this.http.get<User[]>('/api/users').subscribe({
      next: (data) => {
        console.log('SimpleUsersWorkingComponent: Got users:', data);
        this.users = data;
        this.isLoading = false;
        this.dataLoaded = true;
      },
      error: (error) => {
        console.error('SimpleUsersWorkingComponent: Error:', error);
        this.isLoading = false;
        this.dataLoaded = true;
      }
    });
  }
}