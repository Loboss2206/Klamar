import { Component, Input } from '@angular/core';
import IUser from '../../interfaces/IUser';

@Component({
  standalone: true,
  selector: 'app-select-user-item',
  templateUrl: './select-user-item.component.html',
  styleUrls: ['./select-user-item.component.scss']
})
export class SelectUserItemComponent {
  @Input() user!: IUser;

  constructor() { }
}
