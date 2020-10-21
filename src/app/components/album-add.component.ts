import { Component, OnInit} from "@angular/core"
import {ActivatedRoute, Params, Router} from "@angular/router"

import { GLOBAL } from "../services/global"
import { UserService } from "../services/user.service"
import { ArtistService } from "../services/artist.service"
import { AlbumService } from "../services/album.service"
import { Artist } from "../models/artist"
import { Album } from "../models/album"

@Component({
  selector: "album-add",
  templateUrl: "../views/album-add.html",
  providers: [UserService, ArtistService, AlbumService]
})

export class AlbumAddComponent implements  OnInit {
  public titulo: string;
  public artist: Artist;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public addArtistFormMessage;
  public addAlbumFormMessage;

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router, 
    private _userService: UserService, 
    private _artistService: ArtistService, 
    private _albumService: AlbumService
    ){
      this.titulo = "Crear Nuevo album";
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.album = new Album('','','','','');
  }

  ngOnInit(){
    console.log("Crear Album");
  }

  onSubmit(){
    this._route.params.forEach((params: Params) => {
      let artist_id = params['artist'];   
      this.album.artist = artist_id;

      let success = function (response) {
        if(!response.album){
          this.addAlbumFormMessage = "Error en el Servidor";
        }
        else {
          this.album = response.album;
          this.addAlbumFormMessage = "Album Creado con Exito";
          this._router.navigate(['/editar-album', response.album.album._id]);
        }
      };
  
      let error = function (error) {
        let errorMessage = <any>error;
        if(errorMessage){
          this.addAlbumFormMessage = JSON.parse(errorMessage._body).message;
        }
      };

      this._albumService.addAlbum(this.token, this.album).subscribe(
        success.bind(this), 
        error.bind(this)
      );
    });
  }

}