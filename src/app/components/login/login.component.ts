import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  credentialValidation(): boolean{
    return this.email.valid && this.password.valid ? true : false
  }

  logar(){
    this.toast.error("Login e/ou Password invalidos!")
    this.cred.password = '';
  }

}
