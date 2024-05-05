import { Component, Input, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../quizButton/button.component';
import { ZoomSliderComponent } from '../zoomSlider/zoomSlider.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { GenericButtonComponent } from '../genericButton/genericButton.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IUser from '../../interfaces/IUser';
import { NgClass, NgIf } from '@angular/common';
import { UserService } from 'src/services/user-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-userCreator',
  standalone: true,
  imports: [
    ButtonComponent,
    ZoomSliderComponent, NavbarComponent,
    GenericButtonComponent,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    RouterLink
  ],
  templateUrl: './userCreator.component.html',
  styleUrl: './userCreator.component.scss'
})
export class UserCreatorComponent {
  protected userCreatorForm: FormGroup;
  protected user!: IUser;
  protected imageUrl: any;


  constructor(protected formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
    let userId;
    if ((Number(this.route.snapshot.paramMap.get('id')))) {
      this.user = userService.getTheUser(Number(this.route.snapshot.paramMap.get('id'))) as IUser;
      this.imageUrl = this.user.avatar;
      this.userCreatorForm = this.formBuilder.group({
        userImg: [""],
        firstName: [this.user.firstname, Validators.required],
        lastName: [this.user.name, Validators.required],
        userBirth: [this.user.birthdate, Validators.required],
        hobbies: [this.user.hobbies, Validators.required],
        baseZoom: [this.user.config.zoomLevel, Validators.required],
        choiceSimon: [this.user.config.simon.isColorful.toString(), Validators.required],
        choicePrintTipsAfterError: [this.user.config.quiz.showHintAfterError.toString(), Validators.required],
        choicePrintTipsAfterClick: [this.user.config.quiz.showHintAfterClick.toString(), Validators.required],
        choicePrintTipsOneByOne: [this.user.config.quiz.showHintOneByOne.toString(), Validators.required],
        secTipsForMemory: [this.user.config.memoryHints.timeBeforeHints, Validators.required],
        secTipsForSimon: [this.user.config.simonHints.displayTheFullSequenceAfter, Validators.required],
        secVisibleCardForMemory: [this.user.config.memory.timeBeforeSwitching, Validators.required],
        typeOfDalto: [this.user.colorBlind]
      });
    } else {
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
        secVisibleCardForMemory: [0, Validators.required],
        typeOfDalto: [""]
      });
    }
  }


  isFormValid(): boolean {
    return this.userCreatorForm.valid;
  }


  addUser(): void {
    console.log(this.userCreatorForm.getRawValue());
  }

  modifyUser(): void {
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

