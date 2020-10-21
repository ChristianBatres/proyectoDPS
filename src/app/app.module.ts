import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {routing,appRoutingProviders} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {UserEditComponent} from './components/user-edit.component';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
//Artist Modules
import { ArtistListComponent } from "./components/artist-list.component"
import { HomeComponent } from "./components/home.component"
import { ArtistAddComponent} from "./components/artist-add.component"
import { ArtistEditComponent } from "./components/artist-edit.component"
import { AlbumAddComponent} from "./components/album-add.component"
import { AlbumEditComponent} from "./components/album-edit.component"
import { AlbumDetailComponent} from "./components/album-detail.component"

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,  
    AlbumAddComponent, 
    AlbumEditComponent,
    AlbumDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
