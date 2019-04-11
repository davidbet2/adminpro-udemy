import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {retry} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {

    this.regresaObservable().subscribe(
      numero => console.log('Subs', numero),
      error => console.error(error),
      () => console.log('El observer termino')
    );

  }

  ngOnInit() {
  }

  regresaObservable(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador ++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Obs tiene un error');
        // }

      }, 1000);
    });
  }

}
