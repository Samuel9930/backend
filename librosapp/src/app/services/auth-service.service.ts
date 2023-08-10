import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private userEmail: string = '';

  // Método para obtener el correo electrónico del usuario
  getUserEmail(): string {
    return this.userEmail;
  }

  // Método para almacenar el correo electrónico después de iniciar sesión
  setUserEmail(email: string): void {
    this.userEmail = email;
  }
}
