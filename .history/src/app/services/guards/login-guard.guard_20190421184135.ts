import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService) {}

  canActivate() {

    if (this._usuarioService.estaLogueado) {
      console.log('Paso el guard');
      return true;
    } else {
      console.log('Bloqueado por el guard');
      return false;
    }
    
  }
}
