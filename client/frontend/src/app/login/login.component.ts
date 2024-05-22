import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from '../services/loginservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private Login: LoginserviceService) {}
  ngOnInit(): void {}
  login(data: any): void {
    console.log(data);
    this.Login.login(data);
  }
}
