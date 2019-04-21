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

  constructor(
    public http: HttpClient
  ) { }

  login(usuario: Usuario, recordar: boolean = false) {
    return this.http.post(`${this.url}/login`, usuario)
    .pipe(map( (resp: any) => {
      localStorage.setItem('id', resp.id );
      localStorage.setItem('token', resp.token );
      localStorage.setItem('usuario', JSON.stringify(resp.usuario ));
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
