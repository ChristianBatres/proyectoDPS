import { Component, OnInit} from "@angular/core"
import { Router } from "@angular/router"

import { GLOBAL } from "../services/global"
import { UserService } from "../services/user.service"
import { ArtistService } from "../services/artist.service"
import { Artist } from "../models/artist"
import { Album } from "../models/album";

@Component({
  selector: "album-add",
  templateUrl: "../views/album-add.html",
  providers: [UserService, ArtistService]
})

export class ArtistAddComponent implements  OnInit {
  public titulo: string;
  public artist: Artist;
  public album: Album;
  public identity;
  public token;
  public url: string;
  public addArtistFormMessage;

  constructor(private _router: Router, private _userService: UserService, private _artistService: ArtistService){
    this.titulo = "Crear nuevo album";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.artist = new Artist("","","");
  }

  ngOnInit(){
    console.log("Crear artista");
  }
}