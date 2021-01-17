import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NoteComponent } from './note/note.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule} from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    NoteComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: UsersComponent},
      { path: 'user/:userId', component: UserComponent},
    ]),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
