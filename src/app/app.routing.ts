import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import user
import {UserEditComponent} from './components/user-edit.component';


// import Songs 
import {SongAddComponent} from './components/song-add.component';
import {SongEditComponent} from './components/song-edit.component';


const appRoutes: Routes = [
    {path:'',component:UserEditComponent},
    {path:'mis-datos',component:UserEditComponent},
    {path:'**',component:UserEditComponent},
    {path: 'crear-tema/:album', component: SongAddComponent },
    {path: 'editar-tema/:id', component: SongEditComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
