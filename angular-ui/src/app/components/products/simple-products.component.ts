import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-simple-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-products.component.html',
  styleUrl: './simple-products.component.css'
})
export class SimpleProductsComponent implements OnInit {
  products: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  apiUrl = '/api/products';
  componentStatus = 'Initialized';
  lastApiCall = 'Not yet called';

  constructor(private http: HttpClient) {
    console.log('SimpleProductsComponent: Constructor called');
  }

  ngOnInit(): void {
    console.log('SimpleProductsComponent: ngOnInit called');
    this.componentStatus = 'ngOnInit executed';
    this.loadProducts();
  }

  loadProducts(): void {
    console.log('SimpleProductsComponent: loadProducts called');
    this.componentStatus = 'Loading products...';
    this.isLoading = true;
    this.errorMessage = null;
    this.lastApiCall = new Date().toLocaleTimeString();
    
    console.log('SimpleProductsComponent: Making HTTP GET request to', this.apiUrl);
    
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('SimpleProductsComponent: HTTP request successful', data);
        this.products = data;
        this.isLoading = false;
        this.componentStatus = 'Data loaded successfully';
      },
      error: (error) => {
        console.error('SimpleProductsComponent: HTTP request failed', error);
        this.errorMessage = error.message || 'Unknown error';
        this.isLoading = false;
        this.componentStatus = 'Error occurred';
      }
    });
  }
}