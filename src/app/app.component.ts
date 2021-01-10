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
}
