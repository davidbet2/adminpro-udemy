import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../.history/src/app/models/usuario.model_20190421151933';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styles: []
})
export class ProfilesComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }

}
