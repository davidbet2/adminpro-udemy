import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/scss/pages/login-register-lock.scss']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';

    if ( this.email.length > 1) {
      this.recuerdame = true;
    }

  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe( login => {
      this.router.navigate(['dashboard']);
    });
  }

}
