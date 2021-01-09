import { Component, Output } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes-app';
  users: any;
  newName: string = "";
  newContent: string = "";
  newCategory: string = "";

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe((data: string[]) => {
      this.users = data;
    });
  }

  addUser = () => {
    this.apiService.addUser(this.newName).subscribe((result: any) => {
      let error = result.error;

      if (error) {
        console.log(`Error: ${error}`);
      } else {
        this.newName = "";
        this.apiService.getUsers().subscribe((data: string[]) => {
          this.users = data;
        });
      }
    });
  };

  addNote = (name: string) => {
    this.apiService.addNote(this.users[0].name, this.newContent, this.newCategory).subscribe((result: any) => {
      let error = result.error;

      if (error) {
        console.log(`Error: ${error}`);
      } else {
        this.newContent = "";
        this.apiService.getNotes(name).subscribe((data: string[]) => {
          this.users = data;
        });
      }
    });
  };

  deleteUser = (name: string) => {
    this.apiService.deleteUser(name).subscribe((result: any) => {
      console.log(result);

      this.apiService.getUsers().subscribe((data: string[]) => {
        this.users = data;
      });
    });
  };

  deleteNote = (name: string) => {
    this.apiService.deleteNote(name).subscribe((result: any) => {
      console.log(result);

      this.apiService.getNotes(name).subscribe((data: string[]) => {
        this.users = data;
      });
    });
  };
}
