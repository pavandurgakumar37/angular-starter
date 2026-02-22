import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersComponent } from './users.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { of, throwError, Observable } from 'rxjs';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-123-4567' }
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
      imports: [UsersComponent, HttpClientTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty users array and loading state', () => {
    expect(component.users).toEqual([]);
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBeNull();
  });

  it('should load users on initialization', () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    
    fixture.detectChanges(); // Triggers ngOnInit
    
    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBeNull();
  });

  it('should display loading state while fetching users', () => {
    userService.getUsers.and.returnValue(new Observable(() => {}));
    
    component.loadUsers();
    
    expect(component.isLoading).toBe(true);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle successful user loading', () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    
    component.loadUsers();
    
    expect(component.isLoading).toBe(false);
    expect(component.users).toEqual(mockUsers);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle error when loading users', () => {
    const errorMessage = 'Failed to load users';
    userService.getUsers.and.returnValue(throwError(() => new Error(errorMessage)));
    
    component.loadUsers();
    
    expect(component.isLoading).toBe(false);
    expect(component.users).toEqual([]);
    expect(component.errorMessage).toBe(errorMessage);
  });

  it('should display users in the template', () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    
    fixture.detectChanges(); // Triggers ngOnInit
    
    const compiled = fixture.nativeElement as HTMLElement;
    const userRows = compiled.querySelectorAll('tbody tr');
    
    expect(userRows.length).toBe(3);
    expect(userRows[0].textContent).toContain('1');
    expect(userRows[0].textContent).toContain('John Doe');
    expect(userRows[0].textContent).toContain('john@example.com');
    expect(userRows[0].textContent).toContain('123-456-7890');
  });

  it('should display loading message when loading', () => {
    userService.getUsers.and.returnValue(new Observable(() => {}));
    
    component.loadUsers();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')?.textContent).toContain('Loading users...');
  });

  it('should display error message when there is an error', () => {
    const errorMessage = 'Failed to load users';
    userService.getUsers.and.returnValue(throwError(() => new Error(errorMessage)));
    
    component.loadUsers();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error')?.textContent).toContain(errorMessage);
  });

  it('should display no users message when users array is empty', () => {
    userService.getUsers.and.returnValue(of([]));
    
    fixture.detectChanges(); // Triggers ngOnInit
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.no-data')?.textContent).toContain('No users found.');
  });

  it('should have a retry button when there is an error', () => {
    const errorMessage = 'Failed to load users';
    userService.getUsers.and.returnValue(throwError(() => new Error(errorMessage)));
    
    component.loadUsers();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const retryButton = compiled.querySelector('.retry-btn');
    
    expect(retryButton).toBeTruthy();
    expect(retryButton?.textContent).toContain('Retry');
  });

  it('should call loadUsers when retry button is clicked', () => {
    const errorMessage = 'Failed to load users';
    userService.getUsers.and.returnValue(throwError(() => new Error(errorMessage)));
    
    component.loadUsers();
    fixture.detectChanges();
    
    spyOn(component, 'loadUsers');
    
    const compiled = fixture.nativeElement as HTMLElement;
    const retryButton = compiled.querySelector('.retry-btn') as HTMLButtonElement;
    
    retryButton.click();
    
    expect(component.loadUsers).toHaveBeenCalled();
  });
});