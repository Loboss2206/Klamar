import { Component, Input, SimpleChanges } from '@angular/core';
import { ButtonComponent } from '../quizButton/button.component';
import { ZoomSliderComponent } from '../zoomSlider/zoomSlider.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { GenericButtonComponent } from '../genericButton/genericButton.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import IUser from '../../interfaces/IUser';
import { NgClass, NgIf } from '@angular/common';
import { UserService } from 'src/services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    NgIf
  ],
  templateUrl: './userCreator.component.html',
  styleUrl: './userCreator.component.scss'
})
export class UserCreatorComponent {
  protected userCreatorForm: FormGroup;
  protected user!: IUser;
  protected imageUrl: any;
  showMessage: boolean = false;
  message: string = "Utilisateur crée";



  constructor(private router: Router, protected formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute) {
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
        typeOfDalto: [this.user.colorBlind, Validators.required]
      });
    } else {
      this.imageUrl = "https://journalmetro.com/wp-content/uploads/2017/04/default_profile_400x400.png?fit=400%2C400";
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
        typeOfDalto: ["", Validators.required]
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
    let newUserConfig: IUserConfig = {
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
    let newUser: IUser = {
      id: (this.userService.getUsers().length + 1) as number,
      name: this.userCreatorForm.get('lastName')?.getRawValue(),
      firstname: this.userCreatorForm.get('firstName')?.getRawValue(),
      hobbies: this.userCreatorForm.get('hobbies')?.getRawValue(),
      avatar: "https://journalmetro.com/wp-content/uploads/2017/04/default_profile_400x400.png?fit=400%2C400",
      birthdate: this.userCreatorForm.get('userBirth')?.getRawValue(),
      config: newUserConfig,
      charts: [],
      statsId: [],
      colorBlind: this.userCreatorForm.get('typeOfDalto')?.getRawValue()
    };
    const fileInput = document.getElementById('userImg') as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 300; // taille maximale souhaitée
          const maxHeight = 300; // taille maximale souhaitée
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

          // Ajouter votre logique pour envoyer l'image redimensionnée au serveur
          newUser.avatar = resizedImageData;
          this.userService.addUser(newUser);
        };
      };
    } else {
      this.userService.addUser(newUser);
    }
    this.showMessage = true;

    setTimeout(() => {
      this.router.navigate(['/admin/selectUserToModify']);
    }, 2000);
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
      avatar: this.user.avatar,
      birthdate: this.userCreatorForm.get('userBirth')?.getRawValue(),
      config: newUserConfig,
      charts: [],
      statsId: [],
      colorBlind: this.userCreatorForm.get('typeOfDalto')?.getRawValue()
    };
    const fileInput = document.getElementById('userImg') as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 300; // taille maximale souhaitée
          const maxHeight = 300; // taille maximale souhaitée
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

          // Ajouter votre logique pour envoyer l'image redimensionnée au serveur
          newUser.avatar = resizedImageData;

          this.userService.modifyUser(newUser);
        };
      };
    } else {
      this.userService.modifyUser(newUser);
    }
    this.message = "Utilisateur modifié"
    this.showMessage = true;
    setTimeout(() => {
      this.router.navigate(['/admin/selectUserToModify']);
    }, 2000);
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

