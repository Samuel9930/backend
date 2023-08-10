import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksService } from '../google-books.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  bookDetails: any; // Aquí almacenaremos los detalles del libro

  constructor(private route: ActivatedRoute, private googleBooksService: GoogleBooksService) { }
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const bookTitle = params['bookTitle'];
      console.log('Título del libro recibido:', bookTitle);
  
      // Llamar al servicio para obtener detalles del libro por título
      this.googleBooksService.getBookDetailsByTitle(bookTitle).subscribe(
        (data: any) => {
          console.log('Respuesta de la API:', data);
          this.bookDetails = data.items[0];
        },
        (error: any) => {
          console.error('Error al obtener los detalles del libro:', error);
        }
      );
    });
  }
  
}
