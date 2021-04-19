import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthDTO } from 'src/app/models/authDTO';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  invalidLogin = false;

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  constructor(private router: Router, private authService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  async checkLogin(email: string, password: string) {
    let authDTO = new AuthDTO(email, password);
    let isAuth =  await this.authService.authenticate(authDTO);
    if(isAuth) {
      console.log("BENNVAGY");
      this.router.navigate(['investments']);
      this.invalidLogin = false;
    } else {
      console.log("NEMVAGYBENN");
      this.invalidLogin = true;
    }
  }

  onSubmit() {
    this.checkLogin(this.loginForm.value.email, this.loginForm.value.password);
  }


}
