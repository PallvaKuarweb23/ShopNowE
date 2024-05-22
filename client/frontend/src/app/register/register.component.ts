import { Component } from '@angular/core';
import { LoginserviceService } from '../services/loginservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private registerApi: LoginserviceService) {}
  registerFun(data: any) {
    console.log(data);
    this.registerApi.register(data);
  }
}
