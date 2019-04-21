import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.URL_SERVICIOS;

  constructor(
    public http: HttpClient
  ) { }

  crearUsuario(usuario: Usuario) {
    return this.http.post(`${this.url}/usuario`, usuario);
  }

}
