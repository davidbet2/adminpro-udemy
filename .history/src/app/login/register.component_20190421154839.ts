import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/scss/pages/login-register-lock.scss']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor() { }

  sonIguales( campo1: string, campo2: string) {
    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };

    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'password2')});

    this.forma.setValue({
      nombre: 'David',
      correo: 'test@test.com',
      password: '123',
      password2: '1234',
      condiciones: true
    });

  }

  registrarUsuario() {
    console.log(this.forma.value);
  }

}
