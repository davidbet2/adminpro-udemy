import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {retry, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

   this.subscription = this.regresaObservable().subscribe(
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

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Obs tiene un error');
        // }

      }, 1000);
    }).pipe(
      map( resp => resp['valor']),
      filter( ( valor , index ) => {

        if ( (valor % 2) === 1) {
          return true;
        } else {
          return false;
        }
        })
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
