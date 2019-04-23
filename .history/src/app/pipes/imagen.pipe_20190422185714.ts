import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = environment.URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuarios/xxx';
    }

    switch (tipo) {
      case 'usuario':
         url += '/usuarios/' + img;
      break;
      case 'medico':
         url += '/medicos/' + img;
      break;
      case 'hospital':
         url += '/hospitales/' + img;
      break;
    }
  }

}
