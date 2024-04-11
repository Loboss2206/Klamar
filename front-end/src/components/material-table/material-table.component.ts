import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf, SlicePipe} from "@angular/common";
import {GenericButtonComponent} from "../genericButton/genericButton.component";

@Component({
  selector: 'app-material-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    GenericButtonComponent,
    NgClass,
    SlicePipe
  ],
  templateUrl: './material-table.component.html',
  styleUrl: './material-table.component.scss'
})
export class MaterialTableComponent implements OnInit {

  @Input() elements: any[] = [];
  @Input() headers: string[] = [];
  @Input() actions: any[] = [];


  constructor() {
  }

  ngOnInit(): void {
  }

  protected readonly Object = Object;
  @Output() callback = new EventEmitter<any>();

  cellClick(cell: any, action: any) {
   this.callback.emit([cell.id, action]);
  }
}
