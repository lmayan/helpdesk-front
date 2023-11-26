import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credentials } from 'src/app/models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cred: Credentials = {
    email: '', 
    password: ''
  }

  email = new FormControl(null, Validators.email)
  password = new FormControl(null, Validators.minLength(3))

  constructor() { }

  ngOnInit(): void {
  }

  credentialValidation(): boolean{
    return this.email.valid && this.password.valid ? true : false
  }

}
