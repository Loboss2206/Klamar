import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {adminList} from "../../mocks/admin";
import {Router} from "@angular/router";

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

  constructor(public formBuilder: FormBuilder, public router: Router) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  login() {
    console.log(adminList);
    let admin = adminList.find((adminElement: { username: any; mdp: any; }) => adminElement.username === this.loginForm.value.username && adminElement.mdp === this.loginForm.value.password);
    console.log(admin);
    if (admin) {
      this.router.navigate(['/admin']);
    }else {
      alert('Invalid credentials');
    }
  }
}
