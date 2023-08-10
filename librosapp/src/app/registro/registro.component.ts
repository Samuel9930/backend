import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// Importa SweetAlert2
import Swal from 'sweetalert2/src/sweetalert2.js';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.authService.register(username, email, password).subscribe(
        (response:string) => {
          // Procesar la respuesta del backend
          console.log(response);
          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Se ha registrado correctamente.',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            // Redireccionar a la página de inicio de sesión después del mensaje
            this.router.navigate(['/login']);
          });
        },
        (error:string) => {
          console.error(error);
        }
      );
    }
  }
}
