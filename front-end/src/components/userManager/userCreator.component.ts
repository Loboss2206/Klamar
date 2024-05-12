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
import { IUserConfig } from 'src/interfaces/IUserConfig';


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


  triggerFileInput() {
    document.getElementById('userImg')?.click();
  }

  isFormValid(): boolean {
    return this.userCreatorForm.valid;
  }


  addUser(): void {
    const newUserConfig: IUserConfig = {
      id: (this.userService.getUsers().length + 1) as number,
      simon: {
        isColorful: this.userCreatorForm.get('choiceSimon')?.getRawValue(),
      },
      memory: {
        timeBeforeSwitching: this.userCreatorForm.get('secVisibleCardForMemory')?.getRawValue(),
      },
      simonHints: {
        displayTheFullSequenceAfter: this.userCreatorForm.get('secTipsForSimon')?.getRawValue(),
      },
      memoryHints: {
        timeBeforeHints: this.userCreatorForm.get('secTipsForMemory')?.getRawValue(),
      },
      quiz: {
        showHintAfterError: this.userCreatorForm.get('choicePrintTipsAfterError')?.getRawValue(),
        showHintAfterStart: false,
        showHintAfterClick: this.userCreatorForm.get('choicePrintTipsAfterClick')?.getRawValue(),
        showHintOneByOne: this.userCreatorForm.get('choicePrintTipsOneByOne')?.getRawValue(),
      },
      zoomLevel: this.userCreatorForm.get('baseZoom')?.getRawValue(),
    };
    const newUser: IUser = {
      id: (this.userService.getUsers().length + 1) as number,
      name: this.userCreatorForm.get('lastName')?.getRawValue(),
      firstname: this.userCreatorForm.get('firstName')?.getRawValue(),
      hobbies: this.userCreatorForm.get('hobbies')?.getRawValue(),
      avatar: this.userCreatorForm.get('userImg')?.getRawValue(),
      birthdate: this.userCreatorForm.get('userBirth')?.getRawValue(),
      config: newUserConfig,
      charts: [],
      statsId: [],
      colorBlind: this.userCreatorForm.get('typeOfDalto')?.getRawValue()
    };
    this.userService.addUser(newUser);
  }

  modifyUser(): void {
    const newUserConfig: IUserConfig = {
      id: this.user.config.id,
      simon: {
        isColorful: this.userCreatorForm.get('choiceSimon')?.getRawValue(),
      },
      memory: {
        timeBeforeSwitching: this.userCreatorForm.get('secVisibleCardForMemory')?.getRawValue(),
      },
      simonHints: {
        displayTheFullSequenceAfter: this.userCreatorForm.get('secTipsForSimon')?.getRawValue(),
      },
      memoryHints: {
        timeBeforeHints: this.userCreatorForm.get('secTipsForMemory')?.getRawValue(),
      },
      quiz: {
        showHintAfterError: this.userCreatorForm.get('choicePrintTipsAfterError')?.getRawValue(),
        showHintAfterStart: false,
        showHintAfterClick: this.userCreatorForm.get('choicePrintTipsAfterClick')?.getRawValue(),
        showHintOneByOne: this.userCreatorForm.get('choicePrintTipsOneByOne')?.getRawValue(),
      },
      zoomLevel: this.userCreatorForm.get('baseZoom')?.getRawValue(),
    };
    const newUser: IUser = {
      id: this.user.id,
      name: this.userCreatorForm.get('lastName')?.getRawValue(),
      firstname: this.userCreatorForm.get('firstName')?.getRawValue(),
      hobbies: this.userCreatorForm.get('hobbies')?.getRawValue(),
      avatar: this.userCreatorForm.get('userImg')?.getRawValue(),
      birthdate: this.userCreatorForm.get('userBirth')?.getRawValue(),
      config: newUserConfig,
      charts: [],
      statsId: [],
      colorBlind: this.userCreatorForm.get('typeOfDalto')?.getRawValue()
    };
    this.userService.modifyUser(newUser);
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

