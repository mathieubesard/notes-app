import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @Input() users: any;
  newName: string = "";

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    console.log('init users');    
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
}
