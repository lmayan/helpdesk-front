import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Credentials } from 'src/app/models/credentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  cred: Credentials = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email)
  password = new FormControl(null, Validators.minLength(3))

  constructor(
    private toast: ToastrService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  credentialValidation(): boolean {
    return this.email.valid && this.password.valid
  }

  logar() {
    this.auth.authenticate(this.cred).subscribe(res => {
      let token = res.headers.get("Authorization")?.substring(7)
      if (token != null) {
        this.auth.successfulLogin(token)
        this.router.navigate(['home'])
      }
    }, () => {
      this.toast.error("Usuario e/ou senha invalidos!")
    })
  }

}
