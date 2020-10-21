import { Component, OnInit} from "@angular/core"
import {ActivatedRoute, Params, Router} from "@angular/router"

import { GLOBAL } from "../services/global"
import { UserService } from "../services/user.service"
import { AlbumService } from "../services/album.service"
import { UploadService } from "../services/upload.service"
import { Album } from "../models/album"

@Component({
  selector: "album-edit",
  templateUrl: "../views/album-add.html",
  providers: [UserService, AlbumService, UploadService]
})

export class AlbumEditComponent implements  OnInit {
  public titulo: string;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public editAlbumFormMessage;
  public filesToUpload: Array<File>;
  public isEdit;

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router, 
    private _userService: UserService, 
    private _albumService: AlbumService,
    private _uploadService: UploadService
    ){
      this.titulo = "Editar album";
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.url = GLOBAL.url;
      this.album = new Album('','','','','');
      this.isEdit = true;
  }

  ngOnInit(){
    console.log("Editar Album");
    //Obteniendo el album
    this.getAlbum();
  }

  getAlbum(){
    this._route.params.forEach((params: Params) => {
        let id = params['id'];

        let success = function (response) {
            if(!response.album){
              this._route.navigate(['/']);
            }
            else {
              this.album = response.album;
            }
        };
      
        let error = function (error) {
            let errorMessage = <any>error;
            if(errorMessage){
              this.editAlbumFormMessage = JSON.parse(errorMessage._body).message;
            }
        };

        this._albumService.getAlbum(this.token, id).subscribe(
            success.bind(this), 
            error.bind(this)
        );
    });
  }

  onSubmit(){
    this._route.params.forEach((params: Params) => {
      let id = params['id'];   

      let success = function (response) {
        this.editArtistFormMessage = "Album editado con éxito";

        if(!this.filesToUpload){
          this._router.navigate(["/artista", response.album.artist]);
          return;
        } else {
            this._uploadService.makeFileRequest(this.url + "uploadAlbumImage/"+id, this.filesToUpload, this.token, "image")
            .then(function () {
                this._router.navigate(["/artista",  response.album.artist]);
            }.bind(this), error.bind(this));
        }
      };
  
      let error = function (error) {
        let errorMessage = <any>error;
        if(errorMessage){
          this.editAlbumFormMessage = JSON.parse(errorMessage._body).message;
        }
      };

      this._albumService.editAlbum(this.token, id, this.album).subscribe(
        success.bind(this), 
        error.bind(this)
      );
    });
  }

  fileChangeEvent(fileInput){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }

}