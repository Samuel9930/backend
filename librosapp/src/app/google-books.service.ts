import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  searchBooks(query: string) {
    const apiKey = environment.googleBooksApiKey;
    const url = `${this.apiUrl}?q=${query}&key=${apiKey}`;
    return this.http.get(url);
  }
  
  // Nuevo método para obtener detalles de un libro por título
  getBookDetailsByTitle(title: string) {
    const apiKey = environment.googleBooksApiKey;
    const url = `${this.apiUrl}?q=${title}&key=${apiKey}`;
    return this.http.get(url);
  }
}
