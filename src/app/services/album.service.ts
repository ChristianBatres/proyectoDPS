import { Injectable } from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import "rxjs/add/operator/map";
import { GLOBAL } from "./global";
import {Album} from "../models/album";

@Injectable()
export class AlbumService {
  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
  }

  //GETTING ALBUMS
  getAlbums(token, artistId = null){
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": token
    });

    if(artistId == null){
      return this._http.get(this.url + "album/", {headers: headers})
      .map(function (data) {
        return data.json();
      });
    } else {
      return this._http.get(this.url + "album/" + artistId, {headers: headers})
      .map(function (data) {
        return data.json();
      });
    }
  }

  //GETTING AN ALBUM
  getAlbum(token, id: string){
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this._http.get(this.url + "album/" + id, {headers: headers})
      .map(function (data) {
        return data.json();
      });
  }

  //ADDING AN ALBUM
  addAlbum(token, album: Album){
    let params = JSON.stringify(album);
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this._http.post(this.url+"Album", params, {headers: headers})
      .map(function (data) {
        return data.json();
      });
  }

  //EDITING AN ALBUM   
  editAlbum(token, id:string , Album: Album){
    let params = JSON.stringify(Album);
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this._http.put(this.url+"album/" + id, params, {headers: headers})
      .map(function (data) {
        return data.json();
      });
  }

  //DELETING ALBUMS
  deleteAlbumById(token, id: string){
    let headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": token
    });

    return this._http.delete(this.url + "album/" + id, {headers: headers})
      .map(function (data) {
        return data.json();
      });
  }
}