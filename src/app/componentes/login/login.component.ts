import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from '../../servicios/login.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any = 'rgicson@gmail.com';
  password: any = '123456';

  constructor(private router: Router,
              private flashMessages: FlashMessagesService,
              private loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.loginService.getAut().subscribe(auth => {
      if(auth){
        this.router.navigate(["/"]); // de esta manera se navega a la página de inicio.
      }
    })
  }

  login(){
    this.loginService.Login(this.email, this.password)
    .then(res => {
      this.router.navigate(['/']);
    })
    .catch(error => {
      this.flashMessages.show(error.message, {
        cssClass: 'alert-danger', timeout : 4000
      });
    });
  }

}
