import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter} from "rxjs";
import {UserService} from "../../services/user-service.service";
import {NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    NgIf
  ],
  styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent implements OnInit{

  currentState = 'initial';

  title: string = '';
  userName: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
  }


  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.activatedRoute.root;
      while (route.firstChild) route = route.firstChild;
      route.data.subscribe(data => {
          this.title = data['title'];
          if (this.title !== 'Sélection utilisateur' && this.title !== 'Login'){
            this.userName = this.userService.getCurrentUser()?.name + ' ' + this.userService.getCurrentUser()?.firstname || '';
          }else{
            this.userName = '';
          }
      });
    });
  }
}
