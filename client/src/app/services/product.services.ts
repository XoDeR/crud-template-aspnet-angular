import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServices {
  //private baseUrl = 'https://localhost:5266/api/products';
  private baseUrl = 'http://localhost:5266/api/products';
  private _products = signal<Product[]>([]);

  products = computed(() => this._products());

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      tap(data => this._products.set(data))
    );
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(product: Product) {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      tap(() => this.getAll().subscribe()) // auto-refresh
    );
  }

  update(product: Product) {
    return this.http.put(`${this.baseUrl}/${product.id}`, product).pipe(
      tap(() => this.getAll().subscribe())
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.getAll().subscribe())
    );
  }
}
