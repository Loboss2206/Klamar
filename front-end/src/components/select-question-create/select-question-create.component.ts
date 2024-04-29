import {Component} from '@angular/core';
import {NgForOf,NgIf} from "@angular/common";
import {SelectUserItemComponent} from "../select-user-item/select-user-item.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-question-create',
  standalone: true,
  imports: [
    NgForOf,
    SelectUserItemComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './select-question-create.component.html',
  styleUrl: './select-question-create.component.scss'
})
export class SelectQuestionCreateComponent {
  protected questionCreatorComponent: FormGroup;

  constructor(private router: Router, protected formBuilder: FormBuilder) {
    this.questionCreatorComponent = this.formBuilder.group({
      question: ['', Validators.required],
      choicePicture: ['', Validators.required],
      reponse1: ['', Validators.required],
      reponse2: ['', Validators.required],
      reponse3: ['', Validators.required],
      reponse4: ['', Validators.required],
      indice1: ['', Validators.required],
      indice2: ['', Validators.required],
      categorie: ['', Validators.required]
    });
  }
  isFormValid(): boolean {
    return this.questionCreatorComponent.valid;
  }


  navigateToSelectQuestion(): void {
    this.router.navigate(['/selectQuestion']);
  }
}
