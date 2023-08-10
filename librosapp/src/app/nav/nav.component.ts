import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loggedInUserName: string = '';
  isLoggedIn: boolean = false; // Variable para almacenar el estado de inicio de sesión

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    // Obtener el nombre de usuario desde el servicio AuthServiceService
    this.loggedInUserName = this.authService.getUserEmail();
    // Verificar si el usuario está logueado
    this.isLoggedIn = this.loggedInUserName !== ''; // Si el nombre no está vacío, el usuario está logueado
  }
}
