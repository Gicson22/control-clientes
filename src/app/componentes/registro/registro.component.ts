import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from '../../servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  email: any;
  password: any;

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

  registro(){
    this.loginService.registrarse(this.email, this.password)
    .then(res => {
      this.router.navigate(["/"]);
    })
    .catch(error =>{
      this.flashMessages.show(error.message, {
        cssClass: "alert-danger",timeouch: 4000
      });
    });
  }
}
