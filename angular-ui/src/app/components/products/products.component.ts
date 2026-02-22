import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
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
    console.log('ProductsComponent: Loading dummy data immediately');
    this.products = [
      { id: 1, name: 'Laptop', description: 'High-performance laptop with 16GB RAM and 512GB SSD', price: 1299.99 },
      { id: 2, name: 'Smartphone', description: 'Latest smartphone with 5G connectivity and 128GB storage', price: 899.99 },
      { id: 3, name: 'Headphones', description: 'Wireless noise-cancelling headphones with 30-hour battery life', price: 249.99 },
      { id: 4, name: 'Smartwatch', description: 'Fitness tracking smartwatch with heart rate monitor', price: 199.99 },
      { id: 5, name: 'Tablet', description: '10-inch tablet with stylus support and 64GB storage', price: 449.99 }
    ];
    console.log('ProductsComponent: Dummy data loaded, products:', this.products);
  }
}