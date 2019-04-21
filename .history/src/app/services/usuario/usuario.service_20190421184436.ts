import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.URL_SERVICIOS;
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient
  ) { 
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario ));
    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  estaLogueado() {
    return ( this.token.length > 5) ? true : false;
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${this.url}/login`, usuario)
    .pipe(map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(`${this.url}/usuario`, usuario)
    .pipe(map( (resp: any) => {
      swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    }));
  }

}
