import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.setForm();
  }

  constructor(
    private _router: Router,
    private _login: LoginService
  ) { }

  setForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this._login.loginUser(this.loginForm.value).subscribe({
        next: (resp:any) => {
          console.log(resp);

          localStorage.setItem("firstName", resp.firstName);
          localStorage.setItem("lastNameName", resp.lastName)
          localStorage.setItem("email", resp.email)
          localStorage.setItem("id", resp.result._id)
          localStorage.setItem("token", resp.token)
          this._router.navigate(['dashboard']).then(() => {
            alert("login successfull!");
          });
        },
        error: (err) => {
          if(err.status==500)
          alert(err.error.msg)
        }
      }); 
    }

  }
}
