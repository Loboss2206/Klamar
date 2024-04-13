import { Component } from '@angular/core';
import {GenericButtonComponent} from "../genericButton/genericButton.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [
    GenericButtonComponent,
    RouterLink
  ],
  templateUrl: './admin-component.component.html',
  styleUrl: './admin-component.component.scss'
})
export class AdminComponent {

}
