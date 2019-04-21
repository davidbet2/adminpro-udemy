import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../assets/scss/pages/login-register-lock.scss']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
