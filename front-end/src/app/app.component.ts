import {Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../services/user-service.service";
import {filter, Observable} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.clearColorBlind();
  }

  constructor(private userService: UserService, private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      if ((event as NavigationEnd).url === '/') {
        this.clearColorBlind();
      }
    });
  }

  clearColorBlind() {
    let colorblind = document.querySelector('#colorblinder');
    if (colorblind) {
      colorblind.classList.remove(...this.userService.listOfColorsBlind.map((color) => color + "-filter"));
    }
  }
}
