import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  @Input() title: string = '';

  constructor() {
    this.title = 'Page Actuelle';
  }

  setTitle(title: string) {
    this.title = title;
  }
}
