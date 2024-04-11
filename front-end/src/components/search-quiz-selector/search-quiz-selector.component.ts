import {Component, EventEmitter, Output} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-search-quiz-selector',
  templateUrl: './search-quiz-selector.component.html',
  styleUrls: ['./search-quiz-selector.component.scss']
})
export class SearchQuizSelectorComponent {
  @Output() searchTerm = new EventEmitter<string>();

  onInputChange(event: any) {
    this.searchTerm.emit(event.target.value);
  }
  constructor() { }


}
