import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    { id: 1, name: 'Laptop', description: 'High-performance laptop', price: 999.99 },
    { id: 2, name: 'Smartphone', description: 'Latest smartphone model', price: 699.99 },
    { id: 3, name: 'Tablet', description: '10-inch tablet with stylus', price: 349.99 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products successfully', () => {
    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
      expect(products.length).toBe(3);
    });

    const req = httpMock.expectOne('/api/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should handle client-side errors', () => {
    const clientSideError = new ErrorEvent('Network error', {
      message: 'Connection failed'
    });

    service.getProducts().subscribe({
      next: () => expect(true).toBe(false), // Should not reach here
      error: (error) => {
        expect(error.message).toContain('Error: Connection failed');
      }
    });

    const req = httpMock.expectOne('/api/products');
    req.error(clientSideError);
  });

  it('should handle server-side errors', () => {
    const serverSideError = {
      status: 404,
      statusText: 'Not Found',
      message: 'Products not found'
    };

    service.getProducts().subscribe({
      next: () => expect(true).toBe(false), // Should not reach here
      error: (error) => {
        expect(error.message).toContain('Error Code: 404');
        expect(error.message).toContain('Http failure response for /api/products: 404 Not Found');
      }
    });

    const req = httpMock.expectOne('/api/products');
    req.flush('Products not found', serverSideError);
  });

  it('should handle 500 server errors', () => {
    const serverError = {
      status: 500,
      statusText: 'Internal Server Error'
    };

    service.getProducts().subscribe({
      next: () => expect(true).toBe(false), // Should not reach here
      error: (error) => {
        expect(error.message).toContain('Error Code: 500');
      }
    });

    const req = httpMock.expectOne('/api/products');
    req.flush('Internal Server Error', serverError);
  });

  it('should handle empty response', () => {
    service.getProducts().subscribe(products => {
      expect(products).toEqual([]);
      expect(products.length).toBe(0);
    });

    const req = httpMock.expectOne('/api/products');
    req.flush([]);
  });
});