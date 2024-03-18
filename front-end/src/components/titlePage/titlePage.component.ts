import { Component, Input, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-titlePage',
  standalone: true,
  imports: [

  ],
  templateUrl: './titlePage.component.html',
  styleUrl: './titlePage.component.scss'
})
export class titlePageComponent {
  @Input() text!: string;


  constructor() {
  }

}
