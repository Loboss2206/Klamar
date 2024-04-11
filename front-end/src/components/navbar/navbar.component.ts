import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

  title: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute.root;
      while (route.firstChild) route = route.firstChild;
      route.data.subscribe(data => {
        this.title = data['title'];
      });
    });
  }
}
