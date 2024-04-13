import { Component, Input, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../quizButton/button.component';
import { ZoomSliderComponent } from '../zoomSlider/zoomSlider.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { GenericButtonComponent } from '../genericButton/genericButton.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import IUser from '../../interfaces/IUser';
import { UserService } from 'src/services/user-service.service';


@Component({
  selector: 'app-userModifier',
  standalone: true,
  imports: [
    ButtonComponent,
    ZoomSliderComponent, NavbarComponent,
    GenericButtonComponent,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './userModifier.component.html',
  styleUrl: './userModifier.component.scss'
})
export class UserModifierComponent {
  protected userModifierComponent: FormGroup;
  @Input() user!: IUser;

  constructor(private userService: UserService, protected formBuilder: FormBuilder) {
    const userDataString = sessionStorage.getItem('userToModify');
    if (userDataString) {
      this.user = JSON.parse(userDataString);
    }
    this.userModifierComponent = this.formBuilder.group({
      firstName: [this.user.firstname, Validators.required],
      lastName: [this.user.name, Validators.required],
      userBirth: ['', Validators.required],
      hobbies: ['', Validators.required],
      baseZoom: [this.user.config.zoomLevel, Validators.required],
      choiceSimon: [this.user.config.simon.isColorful.toString(), Validators.required],
      choicePrintTipsAfterError: [this.user.config.quiz.showHintAfterError.toString(), Validators.required],
      choicePrintTipsAfterClick: [this.user.config.quiz.showHintAfterClick.toString(), Validators.required],
      choicePrintTipsOneByOne: [this.user.config.quiz.showHintOneByOne.toString(), Validators.required],
      secTipsForMemory: [this.user.config.memoryHints.timeBeforeHints, Validators.required],
      secTipsForSimon: [this.user.config.simonHints.displayTheFullSequenceAfter, Validators.required],
      secVisibleCardForMemory: [this.user.config.memory.timeBeforeSwitching, Validators.required]
    });

  }


  isFormValid(): boolean {
    return this.userModifierComponent.valid;
  }


  addUser(): void {
    console.log(this.userModifierComponent.getRawValue());
  }



}

