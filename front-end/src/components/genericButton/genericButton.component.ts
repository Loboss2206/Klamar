import { Component, Input } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-genericButton',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './genericButton.component.html',
  styleUrl: './genericButton.component.scss'
})
export class GenericButtonComponent {
  @Input() isDeleteButton: boolean = false;
  @Input() isEditButton: boolean = false;
}
