import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/scss/pages/login-register-lock.scss']
})
export class LoginComponent implements OnInit {

  constructor(public _router: Router) { }

  ngOnInit() {
    init_plugins();
  }

  ingresar(forma: NgForm) {
    // this._router.navigate(['/dashboard'] );
    console.log(forma.valid);
    console.log(forma.value);
  }

}
