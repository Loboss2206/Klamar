import { Component, Input } from '@angular/core';
import { StatQuestionComponent } from "../stat-question/stat-question.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-result-memory',
  standalone: true,
  imports: [
    StatQuestionComponent,
    NgFor,
    NgIf
  ],
  templateUrl: './result-memory.component.html',
  styleUrl: './result-memory.component.scss'
})
export class ResultMemoryComponent {

  @Input() erreur?: number
  @Input() indices?: number
  @Input() temps?: number
  @Input() pictures?: string[]
  @Input() wasPassed: boolean | undefined;

  ngOnInit() {
    console.log("erreur: " + this.erreur);
    console.log("indices: " + this.indices);
    console.log("temps: " + this.temps);
    console.log("pictures: " + this.pictures);
  }
}
