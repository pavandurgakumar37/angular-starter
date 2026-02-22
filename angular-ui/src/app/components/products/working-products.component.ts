import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-working-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './working-products.component.html',
  styleUrls: ['./working-products.component.css']
})
export class WorkingProductsComponent implements OnInit {
  products: Product[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }
}