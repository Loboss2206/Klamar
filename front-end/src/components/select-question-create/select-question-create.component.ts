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
  imageUrlQuestion: any;
  imageUrlResponse1: any;
  imageUrlResponse2: any;
  imageUrlResponse3: any;
  imageUrlResponse4: any;

  constructor(private router: Router, protected formBuilder: FormBuilder) {
    this.questionCreatorComponent = this.formBuilder.group({
      question: ['', Validators.required],
      imageQuestion: "",
      imageResponse1: "",
      imageResponse2: "",
      imageResponse3: "",
      imageResponse4: "",
      choicePicture: ['false', Validators.required],
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

  onFileSelected(event: any, imageUrl: any) {
    console.log(imageUrl)
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (imageUrl === "imageUrlQuestion") {
          this.imageUrlQuestion = reader.result;
        } else if (imageUrl === "imageUrlResponse1") {
          this.imageUrlResponse1 = reader.result;
        } else if (imageUrl === "imageUrlResponse2") {
          this.imageUrlResponse2 = reader.result;
        } else if (imageUrl === "imageUrlResponse3") {
          this.imageUrlResponse3 = reader.result;
        } else if (imageUrl === "imageUrlResponse4") {
          this.imageUrlResponse4 = reader.result;
        }
      }
    }
  }
}
