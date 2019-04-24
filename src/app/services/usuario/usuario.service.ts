import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.URL_SERVICIOS;
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
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

  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
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

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${this.url}/usuario/${usuario._id}?token=${this.token}`, usuario)
    .pipe(map((resp: any) => {
      if (usuario._id === this.usuario._id) {
        this.guardarStorage(resp.usuarioGuardado._id, this.token, resp.usuarioGuardado);
      }
      swal('Usuario Actualizado', usuario.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen( archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
    .then( (resp: any) => {
      this.usuario.img = resp.usuario.img;
      swal('Imagen actualizada', this.usuario.nombre, 'success');
      this.guardarStorage(id, this.token, this.usuario);
    })
    .catch( err => {
      console.log(err);
    });
  }

  cargarUsuarios(desde: number = 0) {
    const url = `${this.url}/usuario?desde=${desde}`;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    const url = `${this.url}/busqueda/coleccion/usuarios/${termino}`;
    return this.http.get(url)
    .pipe(map ((resp: any) => {
      return resp.usuarios;
    }));
  }

  borrarUsuario(id: string) {
    const url = `${this.url}/usuario/${id}?token=${this.token}`;
    return this.http.delete(url)
    .pipe( map((resp: any) => {
      swal('Usuario borrado', 'El usuario ha sido elminado correctamente', 'success');
      return true;
    }));
  }

}
