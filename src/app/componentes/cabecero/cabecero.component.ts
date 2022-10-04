import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
  
  isLoggedIn: any;
  loggedInUser: any;
  permitirRegistro: any;

  constructor(private loginService: LoginService,
              private router: Router,
              private configuracionServicio: ConfiguracionServicio
    ) { }

  ngOnInit(): void {
    this.loginService.getAut().subscribe ( auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else{
        this.isLoggedIn = false;
      }
    });
    
    this.configuracionServicio.getConfiguracion().subscribe( configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    })

  }


  logout(){
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(["/login"]);
  }
}
