import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {adminList} from "../../mocks/admin";
import {Router} from "@angular/router";
import {UserService} from "../../services/user-service.service";
import {users} from "../../mocks/users";

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
    console.log(adminList);
    let admin = this.userService.connectAsAdmin(this.loginForm.value.username, this.loginForm.value.password);
    console.log(admin);
    if (admin) {
      this.router.navigate(['/admin']);
    }else {
      alert('Invalid credentials');
    }
  }
}
