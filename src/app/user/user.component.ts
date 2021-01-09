import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() users: any;
  id: string;
  user: any;
  @Output() deleted = new EventEmitter<string>();
  notes: string[];
  newContent: string = "";
  newCategory: string = "";

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('userId');
      });
      console.log(this.id);
      this.apiService.getUsers().subscribe((users2: any[]) => {
        console.log(users2);
        this.user = users2.find(u => u.id == this.id);
        console.log(users2.find(u => u.id == this.id));
        console.log(this.user);
        this.apiService.getNotes(this.user.name).subscribe((data: any[]) => {
          this.notes = data;
          console.log(data);
        });
      });
  }

  addNote = () => {
    console.log(this.user.name + this.newContent + this.newCategory);
    this.apiService.addNote(this.user.name, this.newContent, this.newCategory).subscribe((result: any) => {
      let error = result.error;

      if (error) {
        console.log(`Error: ${error}`);
      } else {
        this.newContent = "";
        this.newCategory = "";
        this.apiService.getNotes(this.user.name).subscribe((data: string[]) => {
          this.notes = data;
        });
      }
    });
  };

  onDeleteClick = () => {
    this.deleted.emit(this.user.name);
  }
}
