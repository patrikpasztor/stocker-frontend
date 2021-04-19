import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserDTO } from 'src/app/models/userDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    name: '',
    email: '',
    password: ''
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    let userDTO = new UserDTO(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password);
    await this.userService.register(userDTO).toPromise();
    console.log('Registered: ' + userDTO.email);
  }



}
