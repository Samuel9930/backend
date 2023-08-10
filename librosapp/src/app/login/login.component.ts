import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

// Importa SweetAlert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,  private AuthServiceService: AuthServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response: any) => {
          // Procesar la respuesta del backend y obtener el correo electrónico del usuario
          const userEmail = response.email; // Ajusta esto según la propiedad que contenga el correo electrónico en la respuesta del backend
          // Almacenar el correo electrónico en el servicio AuthService
          this.AuthServiceService.setUserEmail(userEmail);
          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: `Se ha iniciado sesión correctamente con el correo electrónico`,
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // Redireccionar a la página de inicio de sesión después del mensaje
            this.router.navigate(['']); // Asegúrate de que la ruta '' esté correctamente definida en el archivo de enrutamiento
          });
        },
        (error: string) => {
          // Procesar el error del backend
          console.error(error);
          // Mostrar mensaje de error con SweetAlert2
          Swal.fire({
            icon: 'error',
            title: 'Error de inicio de sesión',
            text: 'Los datos ingresados no coinciden con los de registro. Inténtalo nuevamente.',
            showConfirmButton: false,
            timer: 2500
          });
        }
      );
    }
  }
}
