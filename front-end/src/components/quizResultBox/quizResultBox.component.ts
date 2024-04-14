import { Component, Input, SimpleChanges } from '@angular/core';
import IUser from "../../interfaces/IUser";
import IAdmin from "../../interfaces/IAdmin";

@Component({
  selector: 'app-quizResultBox',
  standalone: true,
  imports: [
  ],
  templateUrl: './quizResultBox.component.html',
  styleUrl: './quizResultBox.component.scss'
})
export class quizResultBoxComponent {

  user ?: IUser | IAdmin
  id: number | undefined
  @Input() sucessSimon ?: number
  @Input() sucessMemory ?: number
  @Input() sucessQuiz ?: string
}
