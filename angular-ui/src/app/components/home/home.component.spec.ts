import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.title).toBe('Welcome to Angular UI Demo');
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to Angular UI Demo');
  });

  it('should display the description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('This is a simple Angular application that demonstrates consuming data from a Spring Boot API.');
  });

  it('should have navigation links to Users and Products pages', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const usersLink = compiled.querySelector('a[routerLink="/users"]');
    const productsLink = compiled.querySelector('a[routerLink="/products"]');
    
    expect(usersLink).toBeTruthy();
    expect(productsLink).toBeTruthy();
    expect(usersLink?.textContent).toContain('View Users');
    expect(productsLink?.textContent).toContain('View Products');
  });

  it('should display feature cards for Users and Products', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.feature-card');
    
    expect(featureCards.length).toBe(2);
    expect(featureCards[0].querySelector('h2')?.textContent).toBe('Users');
    expect(featureCards[1].querySelector('h2')?.textContent).toBe('Products');
  });
});