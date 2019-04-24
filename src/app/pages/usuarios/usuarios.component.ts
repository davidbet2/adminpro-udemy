import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
    .subscribe(resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
    .subscribe((usuarios: any) => {
      this.cargando = false;
      this.totalRegistros = usuarios.total;
      this.usuarios = usuarios.usuarios;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string) {
    this.cargando = true;

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this._usuarioService.buscarUsuarios(termino)
    .subscribe( (usuarios: Usuario[]) => {
      this.cargando = false;
      this.usuarios = usuarios;
    });
  }

  borrarUsuario(usuario: Usuario) {

    if ( usuario._id === this._usuarioService.usuario._id) {
      swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'info');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {

      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe( borrarUsuario => {
          this.cargarUsuarios();
        });
      }

    });

  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
