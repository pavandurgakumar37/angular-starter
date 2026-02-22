import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-simple-products-working',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Products</h2>
      <div *ngIf="isLoading">Loading products...</div>
      <div *ngIf="products && products.length > 0">
        <p>Found {{ products.length }} products:</p>
        <table border="1" style="border-collapse: collapse; width: 100%;">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price.toFixed(2) }}</td>
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
export class SimpleProductsWorkingComponent implements OnInit {
  products: Product[] = [];
  isLoading = true;
  private dataLoaded = false;

  constructor(private http: HttpClient) {
    console.log('SimpleProductsWorkingComponent: Constructor');
  }

  ngOnInit(): void {
    console.log('SimpleProductsWorkingComponent: ngOnInit - loading products');
    if (!this.dataLoaded) {
      this.loadProducts();
    }
  }

  loadProducts(): void {
    console.log('SimpleProductsWorkingComponent: Loading products from API');
    this.http.get<Product[]>('/api/products').subscribe({
      next: (data) => {
        console.log('SimpleProductsWorkingComponent: Got products:', data);
        this.products = data;
        this.isLoading = false;
        this.dataLoaded = true;
      },
      error: (error) => {
        console.error('SimpleProductsWorkingComponent: Error:', error);
        this.isLoading = false;
        this.dataLoaded = true;
      }
    });
  }
}