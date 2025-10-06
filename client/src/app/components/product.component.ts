import { Component, OnInit } from '@angular/core';
import { ProductServices } from '../services/product.services';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product.component',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  get products() {
    return this.productService.products();
  }

  newProduct: Product = { name: '', description: '', price: 0 };
  selectedProduct: Product | null = null;

  constructor(public productService: ProductServices) { }

  ngOnInit() {
    this.productService.getAll().subscribe();
  }

  save() {
    if (this.selectedProduct) {
      this.productService.update(this.selectedProduct).subscribe(() => this.selectedProduct = null);
    } else {
      this.productService.create(this.newProduct).subscribe(() => this.newProduct = { name: '', description: '', price: 0 });
    }
  }

  edit(product: Product) {
    this.selectedProduct = { ...product };
  }

  delete(id: number) {
    this.productService.delete(id).subscribe();
  }
}
