import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Configuracion } from '../modelo/configuracion.model';



@Injectable()
export class ConfiguracionServicio{
    
    configuracionDoc: any;
    configuracion: any;

    //id único de la colección de la configuración
    id = "1";

    constructor(private db: AngularFirestore){}

    getConfiguracion() : Observable<Configuracion>{
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracion = this.configuracionDoc.valueChanges();
        return this.configuracion;
    }

    modificarCOnfiguracion(configuracion: Configuracion){
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracionDoc.update(configuracion);
    }

}
