import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent, RouterTestingModule, RouterLinkActive, RouterLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.title).toBe('Angular UI Demo');
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular UI Demo');
  });

  it('should have navigation links to Home, Users, and Products pages', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const homeLink = compiled.querySelector('a[routerLink="/"]');
    const usersLink = compiled.querySelector('a[routerLink="/users"]');
    const productsLink = compiled.querySelector('a[routerLink="/products"]');
    
    expect(homeLink).toBeTruthy();
    expect(usersLink).toBeTruthy();
    expect(productsLink).toBeTruthy();
    expect(homeLink?.textContent).toContain('Home');
    expect(usersLink?.textContent).toContain('Users');
    expect(productsLink?.textContent).toContain('Products');
  });

  it('should have routerLinkActive directive on navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.nav-link');
    
    expect(navLinks.length).toBe(3);
    
    navLinks.forEach(link => {
      expect(link.getAttribute('routerLinkActive')).toBe('active');
    });
  });

  it('should have proper navigation structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navbar = compiled.querySelector('.navbar');
    const navContainer = compiled.querySelector('.nav-container');
    const navBrand = compiled.querySelector('.nav-brand');
    const navMenu = compiled.querySelector('.nav-menu');
    const navItems = compiled.querySelectorAll('.nav-item');
    
    expect(navbar).toBeTruthy();
    expect(navContainer).toBeTruthy();
    expect(navBrand).toBeTruthy();
    expect(navMenu).toBeTruthy();
    expect(navItems.length).toBe(3);
  });
});