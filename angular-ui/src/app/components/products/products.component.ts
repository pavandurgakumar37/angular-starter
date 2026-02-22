import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  private apiUrl = '/api/products';

  constructor(private http: HttpClient) {
    console.log('ProductsComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('ProductsComponent: ngOnInit called');
    this.loadProducts();
  }
  
  ngAfterViewInit(): void {
    console.log('ProductsComponent: ngAfterViewInit called');
  }
  
  ngAfterContentChecked(): void {
    console.log('ProductsComponent: ngAfterContentChecked called, isLoading:', this.isLoading, 'products.length:', this.products.length);
  }

  loadProducts(): void {
    console.log('ProductsComponent: Loading data from API');
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('ProductsComponent: Successfully received products data:', data);
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('ProductsComponent: Error loading products:', error);
        this.products = [];
        this.isLoading = false;
      }
    });
  }
}