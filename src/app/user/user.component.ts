import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: string;
  user: any;
  notes: any[];
  newContent: string = "";
  newCategory: string = "";
  searchContent: string = "";
  searchCategory: string = "";
  allNotes: any[];

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
      this.apiService.getUsers().subscribe((users: any[]) => {
        console.log(users);
        this.user = users.find(u => u.id == this.id);
        console.log(this.user);
        this.getNotes();
      });
  }

  getNotes = () => {
    this.apiService.getNotes(this.user.name).subscribe((data: any[]) => {
      this.notes = data;
      this.allNotes = data;
    });        
  }

  addNote = () => {
    console.log(`addNote: name: ${this.user.name} content: ${this.newContent} category: ${this.newCategory}`);
    this.apiService.addNote(this.user.name, this.newContent, this.newCategory).subscribe((result: any) => {
      let error = result.error;
      if (error) {
        console.log(`Error: ${error}`);
      } 
      else {
        this.newContent = "";
        this.newCategory = "";
        this.getNotes();
      }
    });
  };

  deleteNote = (id: string) => {
    console.log(`deleteNote: id: ${id}`);
    this.apiService.deleteNote(id).subscribe((result: any) => {
      let error = result.error;
      if (error) {
        console.log(`Error: ${error}`);
      } 
      else {
        this.getNotes();
      }
    });
  }

  filterContent = () => {
    this.clearCategory();
    console.log(this.allNotes.filter(n => n.content.toLowerCase().includes(this.searchContent.toLowerCase())));
    this.notes = this.allNotes.filter(n => n.content.toLowerCase().includes(this.searchContent.toLowerCase()));
  }

  clearContent = () => {
    this.searchContent = "";
    this.notes = this.allNotes;
  }

  filterCategory = () => {
    this.clearContent();
    if (!this.searchCategory) {
      console.log(this.allNotes.filter(n => n.category == this.searchCategory));
      this.notes = this.allNotes.filter(n => n.category == this.searchCategory);
    }
    else {
      console.log(this.allNotes.filter(n => n.category.toLowerCase().includes(this.searchCategory.toLowerCase())));
      this.notes = this.allNotes.filter(n => n.category.toLowerCase().includes(this.searchCategory.toLowerCase()));      
    }
  }

  clearCategory = () => {
    this.searchCategory = "";
    this.notes = this.allNotes;
  }
}
