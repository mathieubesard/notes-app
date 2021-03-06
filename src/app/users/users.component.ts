import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  preserveWhitespaces: true
})
export class UsersComponent implements OnInit {
  @Input() users: any;
  newName: string = "";

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data: any) => {
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

  deleteUser = (name: string) => {
    this.apiService.deleteUser(name).subscribe((result: any) => {
      this.apiService.getUsers().subscribe((data: string[]) => {
        this.users = data;
      });
    });
  };
}
