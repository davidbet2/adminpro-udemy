import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  constructor(private router: Router) {
    
    this.getDataRoute().subscribe(data => {
      console.log(data);
    });
  }

  getDataRoute() {
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (resp: ActivationEnd) => resp.snapshot.data )
    );
  }

  ngOnInit() {
  }

}
