import { Component, OnInit} from "@angular/core"
import {ActivatedRoute, Params, Router} from "@angular/router"

import { GLOBAL } from "../services/global"
import { UserService } from "../services/user.service"
import { AlbumService } from "../services/album.service"
import { Album } from "../models/album"

@Component({
  selector: "album-detail",
  templateUrl: "../views/album-detail.html",
  providers: [UserService, AlbumService]
})

export class AlbumDetailComponent implements  OnInit {
  public titulo: string;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public albumFormMessage;

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router, 
    private _userService: UserService, 
    private _albumService: AlbumService
    ){
      this.titulo = "Crear Nuevo album";
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.album = new Album('','','','','');
  }

  ngOnInit(){
    console.log("Detalle de Album");
    //Obtener album de la bdd
    this.getAlbum();
  }

  getAlbum(){
    this._route.params.forEach((params: Params) => {
        let id = params['id'];

        let success = function (response) {
            if(!response.album){
              this.albumFormMessage = "Error en el Servidor";
            }
            else {
              this.album = response.album;
              this._router.navigate(['/']);
            }
          };
      
          let error = function (error) {
            let errorMessage = <any>error;
            if(errorMessage){
              this.albumFormMessage = JSON.parse(errorMessage._body).message;
            }
          };

        this._albumService.getAlbum(this.token, id).subscribe(
            success.bind(this), 
            error.bind(this)
        );
    });
  }

}