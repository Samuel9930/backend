import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../google-books.service';
import {  Input } from '@angular/core';



@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent implements OnInit {
  loading: boolean = false;
  books: any[] = [];
  searchTerm: string = '';
  showResultsMessage: boolean = false;
  @Input() item: any;   // Variable para mostrar el mensaje de resultados


  cartItems: any[] = [];
  total: number = 0;


  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.calculateTotal();
  }

  clearCart() {
    this.cartItems = [];
    this.calculateTotal();
  }

  getBookPrice(book: any): number {
    // Implementa lógica para obtener el precio del libro, si lo tienes disponible
    // Puedes retornar un valor fijo o calcularlo de acuerdo a tus necesidades
    return 10; // Ejemplo de valor fijo
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((acc, book) => acc + this.getBookPrice(book), 0);
  }

  addToCart(book: any) {
    const existingCartItem = this.cartItems.find(item => item.id === book.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      book.quantity = 1; // Agregamos la propiedad quantity al libro
      book.price = this.getBookPrice(book); // Asignamos el precio al libro usando la lógica que implementes
      this.cartItems.push(book); // Agregamos el libro al carrito
    }
  }
  
  decrementQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.calculateTotal();
    }
  }
  
  incrementQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.calculateTotal();
  }
  
  constructor(private googleBooksService: GoogleBooksService) { }

  ngOnInit(): void {
  }

  onSearch() {
    if (this.searchTerm.trim() !== '') {
      this.loading = true;
      this.googleBooksService.searchBooks(this.searchTerm).subscribe(
        (data: any) => {
          this.books = data.items || []; // Los resultados de búsqueda se almacenan en el arreglo 'items'
          this.loading = false;
        },
        (error: any) => {
          console.error('Error al realizar la búsqueda:', error);
          this.loading = false;
        }
      );
    }
  }
}
