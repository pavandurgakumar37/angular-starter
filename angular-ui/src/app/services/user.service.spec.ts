import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-123-4567' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users successfully', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(3);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should handle client-side errors', () => {
    const clientSideError = new ErrorEvent('Network error', {
      message: 'Connection failed'
    });

    service.getUsers().subscribe({
      next: () => expect(true).toBe(false), // Should not reach here
      error: (error) => {
        expect(error.message).toContain('Error: Connection failed');
      }
    });

    const req = httpMock.expectOne('/api/users');
    req.error(clientSideError);
  });

  it('should handle server-side errors', () => {
    const serverSideError = {
      status: 404,
      statusText: 'Not Found',
      message: 'Users not found'
    };

    service.getUsers().subscribe({
      next: () => expect(true).toBe(false), // Should not reach here
      error: (error) => {
        expect(error.message).toContain('Error Code: 404');
        expect(error.message).toContain('Http failure response for /api/users: 404 Not Found');
      }
    });

    const req = httpMock.expectOne('/api/users');
    req.flush('Users not found', serverSideError);
  });

  it('should handle 500 server errors', () => {
    const serverError = {
      status: 500,
      statusText: 'Internal Server Error'
    };

    service.getUsers().subscribe({
      next: () => expect(true).toBe(false), // Should not reach here
      error: (error) => {
        expect(error.message).toContain('Error Code: 500');
      }
    });

    const req = httpMock.expectOne('/api/users');
    req.flush('Internal Server Error', serverError);
  });

  it('should handle empty response', () => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual([]);
      expect(users.length).toBe(0);
    });

    const req = httpMock.expectOne('/api/users');
    req.flush([]);
  });
});