import { Component, Input, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../quizButton/button.component';
import { ZoomSliderComponent } from '../zoomSlider/zoomSlider.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { GenericButtonComponent } from '../genericButton/genericButton.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';


@Component({
  selector: 'app-userCreator',
  standalone: true,
  imports: [
    ButtonComponent,
    ZoomSliderComponent, NavbarComponent,
    GenericButtonComponent,
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './userCreator.component.html',
  styleUrl: './userCreator.component.scss'
})
export class UserCreatorComponent {
  protected userCreatorForm: FormGroup;
  protected imageUrl: any;


  constructor(protected formBuilder: FormBuilder) {

    this.userCreatorForm = this.formBuilder.group({
      userImg: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userBirth: ['', Validators.required],
      hobbies: ['', Validators.required],
      baseZoom: [100, Validators.required],
      choiceSimon: ['', Validators.required],
      choicePrintTipsAfterError: ['', Validators.required],
      choicePrintTipsAfterClick: ['', Validators.required],
      choicePrintTipsOneByOne: ['', Validators.required],
      secTipsForMemory: [0, Validators.required],
      secTipsForSimon: [0, Validators.required],
      secVisibleCardForMemory: [0, Validators.required]
    });
  }


  isFormValid(): boolean {
    return this.userCreatorForm.valid;
  }


  addUser(): void {
    console.log(this.userCreatorForm.getRawValue());
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }


}

