import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClienteServicio } from '../../servicios/cliente.service';
import { Cliente } from '../../modelo/cliente.model';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteServicio]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]=[];
  cliente: any ={
    nombre: "",
    apellido: "",
    email: "",
    saldo: 0
  }

  @ViewChild("clienteForm") clienteForm?: NgForm
  @ViewChild("botonCerrar") botonCerrar?:ElementRef

  constructor(private clientesServicio:ClienteServicio,
              private flashMessages: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }
  
  getSaldoTotal(){
    let saldoTotal: number = 0;
    if(this.clientes){
      this.clientes.forEach( cliente =>{
        saldoTotal += cliente.saldo!;
      })
    }
    return saldoTotal;
  }

  agregar({value, valid}: {value:any, valid: any}){
    if(!valid){
      this.flashMessages.show("Por favor llena el formulario correctamente", {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      //Agregar el nuevo cliente
      this.clientesServicio.agregarCliente(value);
      this.clienteForm?.resetForm();
      this.cerrarModal();
    }
  }
  private cerrarModal(){
    this.botonCerrar?.nativeElement.click();
  }

}
