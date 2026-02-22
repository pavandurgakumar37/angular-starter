import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsComponent } from './products.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { of, throwError, Observable } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 999.99 },
    { id: 2, name: 'Smartphone', description: 'Latest smartphone model', price: 699.99 },
    { id: 3, name: 'Tablet', description: '10-inch tablet with stylus', price: 349.99 }
  ];

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, HttpClientTestingModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty products array and loading state', () => {
    expect(component.products).toEqual([]);
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBeNull();
  });

  it('should load products on initialization', () => {
    productService.getProducts.and.returnValue(of(mockProducts));
    
    fixture.detectChanges(); // Triggers ngOnInit
    
    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBeNull();
  });

  it('should display loading state while fetching products', () => {
    productService.getProducts.and.returnValue(new Observable(() => {}));
    
    component.loadProducts();
    
    expect(component.isLoading).toBe(true);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle successful product loading', () => {
    productService.getProducts.and.returnValue(of(mockProducts));
    
    component.loadProducts();
    
    expect(component.isLoading).toBe(false);
    expect(component.products).toEqual(mockProducts);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle error when loading products', () => {
    const errorMessage = 'Failed to load products';
    productService.getProducts.and.returnValue(throwError(() => new Error(errorMessage)));
    
    component.loadProducts();
    
    expect(component.isLoading).toBe(false);
    expect(component.products).toEqual([]);
    expect(component.errorMessage).toBe(errorMessage);
  });

  it('should display products in the template', () => {
    productService.getProducts.and.returnValue(of(mockProducts));
    
    fixture.detectChanges(); // Triggers ngOnInit
    
    const compiled = fixture.nativeElement as HTMLElement;
    const productRows = compiled.querySelectorAll('tbody tr');
    
    expect(productRows.length).toBe(3);
    expect(productRows[0].textContent).toContain('1');
    expect(productRows[0].textContent).toContain('Laptop');
    expect(productRows[0].textContent).toContain('High-performance laptop');
    expect(productRows[0].textContent).toContain('$999.99');
  });

  it('should display loading message when loading', () => {
    productService.getProducts.and.returnValue(new Observable(() => {}));
    
    component.loadProducts();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')?.textContent).toContain('Loading products...');
  });

  it('should display error message when there is an error', () => {
    const errorMessage = 'Failed to load products';
    productService.getProducts.and.returnValue(throwError(() => new Error(errorMessage)));
    
    component.loadProducts();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.error')?.textContent).toContain(errorMessage);
  });

  it('should display no products message when products array is empty', () => {
    productService.getProducts.and.returnValue(of([]));
    
    fixture.detectChanges(); // Triggers ngOnInit
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.no-data')?.textContent).toContain('No products found.');
  });

  it('should have a retry button when there is an error', () => {
    const errorMessage = 'Failed to load products';
    productService.getProducts.and.returnValue(throwError(() => new Error(errorMessage)));
    
    component.loadProducts();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const retryButton = compiled.querySelector('.retry-btn');
    
    expect(retryButton).toBeTruthy();
    expect(retryButton?.textContent).toContain('Retry');
  });

  it('should call loadProducts when retry button is clicked', () => {
    const errorMessage = 'Failed to load products';
    productService.getProducts.and.returnValue(throwError(() => new Error(errorMessage)));
    
    component.loadProducts();
    fixture.detectChanges();
    
    spyOn(component, 'loadProducts');
    
    const compiled = fixture.nativeElement as HTMLElement;
    const retryButton = compiled.querySelector('.retry-btn') as HTMLButtonElement;
    
    retryButton.click();
    
    expect(component.loadProducts).toHaveBeenCalled();
  });

  it('should format price correctly in the template', () => {
    productService.getProducts.and.returnValue(of(mockProducts));
    
    fixture.detectChanges(); // Triggers ngOnInit
    
    const compiled = fixture.nativeElement as HTMLElement;
    const productRows = compiled.querySelectorAll('tbody tr');
    
    expect(productRows[0].textContent).toContain('$999.99');
    expect(productRows[1].textContent).toContain('$699.99');
    expect(productRows[2].textContent).toContain('$349.99');
  });
});