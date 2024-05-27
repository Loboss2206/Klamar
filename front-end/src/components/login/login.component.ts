import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../../services/user-service.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, public userService: UserService) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  login() {
    this.userService.connectAsAdmin(this.loginForm.value.username, this.loginForm.value.password);
    let colorblind = document.querySelector('#colorblinder');
    if (colorblind)
      colorblind.className = '';
  }
}
