import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../app/services/global';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

//Service
//import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService],
  
})
export class AppComponent implements OnInit {
  public title = 'SPOTIFAIK';
  public user:User;
  public user_register:User;
  public identity;
  public token;
  public errorMessage;
  public url:string;
 
  
  public alertRegister;
  public google;
  public base;
  constructor(
    private _userService:UserService,
    public afs: AngularFirestore,   //  Inyectar Servicio Firestore
    public afAuth: AngularFireAuth, // Inyectar el servicio de autenticación de Firebase
    
  ){
    this.user=new User('','','','','','ROLE_USER','');
    this.user_register=new User('','','','','','ROLE_USER','');
    this.url=GLOBAL.url;
    
  }

  ngOnInit(){
    this.identity=this._userService.getIdentity();
    this.token=this._userService.getToken();
    this.google=localStorage.getItem('base');
    this.google=localStorage.getItem('google');

  }
  

  public onSubmit(){
    console.log(this.user);
    //consiguiendo datos de usuario
    this._userService.signup(this.user).subscribe(
      response => {
        console.log(response);
        let identity=response.user;
        this.identity=identity;

        if (!this.identity._id) {
          alert("El usuario no esta correctamente identificado");
        } else {
          //Crear elemento en el localstore para tener el usuario en sesion

                  localStorage.setItem('identity',JSON.stringify(identity));
          //consiguiendo token
          this.google=null; 
          this.base='true'; 
          localStorage.setItem('google',this.google);
          localStorage.setItem('base',this.base);
                    this._userService.signup(this.user,'true').subscribe(
                      response => {
                        console.log(response);
                        let token=response.token;
                        this.token=token;
                
                        if (this.token.length <= 0 ) {
                          alert("El token no se ha generado");
                        } else {
                          //Crear elemento en el localstore para tener el usuario en sesion
                          localStorage.setItem('token',token);
                          this.user=new User('','','','','','ROLE_USER','');
                                       

                        }
                                       

                      }, 
                      error => {
                        var errorMessage = <any>error;
                
                        if (errorMessage !=null) {
                      //  var body=JSON.parse(error.message._body);
                        this.errorMessage=error.error.message;
                          console.log(error);
                        }
                      }
                    );

        }

      }, 
      error => {
        var errorMessage = <any>error;

        if (errorMessage !=null) {
      //  var body=JSON.parse(error.message._body);
        this.errorMessage=error.error.message;
          console.log(error);
        }
      }
    );
  }
  logout(){
    this.base='false';
    this.google='false';
    localStorage.removeItem('user');
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.removeItem('base');
    localStorage.removeItem('google');
    this.identity=null;
    this.token=null;
    this.token=null;
    
    console.log(this.google);
    localStorage.clear();
    this.identity=null;
    this.token=null;
  }

// Iniciar sesión usando  Google
GoogleAuth() {
  return this.AuthLogin(new auth.GoogleAuthProvider());
}

// Lógica de autenticación para ejecutar cualquier proveedor de autenticación  
AuthLogin(provider) {
  return this.afAuth.signInWithPopup(provider)
  .then((result) => {
    console.log(result);
    let identity=result.user;
    this.identity=identity;
    localStorage.setItem('identity',JSON.stringify(identity));
    
    this.google='true'; 
    this.base=null; 
    localStorage.setItem('google',this.google);
    localStorage.setItem('base',this.base);
    

  }).catch((error) => {
    window.alert(error)
  })
}
  




  onSubmitRegister(){
    console.log(this.user_register);
    this._userService.register(this.user_register).subscribe(
      response => {
        let user =response.user;
        this.user_register= user;

        if (!user._id) {
          this.alertRegister='Error al registrar';
        } else {
          this.alertRegister='Registro Exitoso';
          this.user_register=new User('','','','','','ROLE_USER','');

        }
      }, 
      error => {
        var errorMessage = <any>error;

        if (errorMessage !=null) {
      //  var body=JSON.parse(error.message._body);
        this.alertRegister=error.error.message;
          console.log(error);
        }
      }
    );
  }
}

