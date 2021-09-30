import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage : string= "";
  email: string;
  password: string;

  constructor(private formBuilder : FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signInForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }
  signIn(){
    try {
      this.email = this.signInForm.get('email').value.toString();
      this.password = this.signInForm.get('password').value.toString();
      this.authService.signIn(this.email, this.password)
    } catch (error) {
      this.errorMessage = "Une erreur est survenue";
      
    }
    
  }
}
