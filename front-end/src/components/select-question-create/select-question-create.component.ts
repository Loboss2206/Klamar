import { Component } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { QuestionService } from 'src/services/question.service';
import IQuestion from 'src/interfaces/IQuestion';

@Component({
  selector: 'app-select-question-create',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './select-question-create.component.html',
  styleUrl: './select-question-create.component.scss'
})
export class SelectQuestionCreateComponent {
  protected questionCreatorComponent: FormGroup;
  imageUrlQuestion: any = "";
  imageUrlResponse1: any = "";
  imageUrlResponse2: any = "";
  imageUrlResponse3: any = "";
  imageUrlResponse4: any = "";
  imageBase64Question: any = "";
  imageBase64Response1: any = "";
  imageBase64Response2: any = "";
  imageBase64Response3: any = "";
  imageBase64Response4: any = "";


  constructor(private router: Router, protected formBuilder: FormBuilder, private questionService: QuestionService) {
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
    let newQuestion: IQuestion = {
      id: (this.questionService.getQuestions().length + 1),
      question: this.questionCreatorComponent.get('question')?.getRawValue(),
      questionImage: this.questionCreatorComponent.get('imageQuestion')?.getRawValue(),
      tips: [this.questionCreatorComponent.get('indice1')?.getRawValue(), this.questionCreatorComponent.get('indice2')?.getRawValue()],
      AreResponsesImages: this.questionCreatorComponent.get('choicePicture')?.getRawValue(),
      responses: [this.questionCreatorComponent.get('reponse1')?.getRawValue(), this.questionCreatorComponent.get('reponse2')?.getRawValue(), this.questionCreatorComponent.get('reponse3')?.getRawValue(), this.questionCreatorComponent.get('reponse4')?.getRawValue()],
      answer: this.questionCreatorComponent.get('reponse1')?.getRawValue(),
      tags: [this.questionCreatorComponent.get('categorie')?.getRawValue()],
    };
    if (this.imageBase64Question != "") {
      newQuestion.questionImage = this.imageBase64Question;
    }
    if (this.imageBase64Response1 != "") {
      newQuestion.responses[0] = this.imageBase64Response1;
      newQuestion.answer = this.imageBase64Response1;
    }
    if (this.imageBase64Response2 != "") {
      newQuestion.responses[1] = this.imageBase64Response2;
    }
    if (this.imageBase64Response3 != "") {
      newQuestion.responses[2] = this.imageBase64Response3;
    }
    if (this.imageBase64Response4 != "") {
      newQuestion.responses[3] = this.imageBase64Response4;
    }
    console.log(newQuestion.questionImage);
    this.questionService.createNewQuestion(newQuestion);
    setTimeout(() => {
      this.router.navigate(['/admin/selectQuestion']);
    }, 2000);
  }
  resizedImage(reader: FileReader, typeOfImage: string): void {
    const img = new Image();
    img.src = reader.result as string;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxWidth = 200; // taille maximale souhaitée
      const maxHeight = 200; // taille maximale souhaitée
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, width, height);

      // Récupérer l'image redimensionnée au format base64
      const resizedImageData = canvas.toDataURL('image/jpeg');
      if (typeOfImage === "imageUrlQuestion") {
        this.imageBase64Question = resizedImageData;
      } else if (typeOfImage === "imageUrlResponse1") {
        this.imageBase64Response1 = resizedImageData;
      } else if (typeOfImage === "imageUrlResponse2") {
        this.imageBase64Response2 = resizedImageData;
      } else if (typeOfImage === "imageUrlResponse3") {
        this.imageBase64Response3 = resizedImageData;
      } else if (typeOfImage === "imageUrlResponse4") {
        this.imageBase64Response4 = resizedImageData;
      }
    }
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
          this.imageBase64Question = this.resizedImage(reader, "imageUrlQuestion");
        } else if (imageUrl === "imageUrlResponse1") {
          this.imageUrlResponse1 = reader.result;
          this.imageBase64Response1 = this.resizedImage(reader, "imageUrlResponse1");
        } else if (imageUrl === "imageUrlResponse2") {
          this.imageUrlResponse2 = reader.result;
          this.imageBase64Response2 = this.resizedImage(reader, "imageUrlResponse2");
        } else if (imageUrl === "imageUrlResponse3") {
          this.imageUrlResponse3 = reader.result;
          this.imageBase64Response3 = this.resizedImage(reader, "imageUrlResponse3");
        } else if (imageUrl === "imageUrlResponse4") {
          this.imageUrlResponse4 = reader.result;
          this.imageBase64Response4 = this.resizedImage(reader, "imageUrlResponse4");
        }
      }
    }
  }
}
