import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  preserveWhitespaces: true
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
      this.id = params.get('userId');
      });
      this.apiService.getUsers().subscribe((users: any[]) => {
        this.user = users.find(u => u.id == this.id);
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
    this.notes = this.allNotes.filter(n => n.content.toLowerCase().includes(this.searchContent.toLowerCase()));
  }

  clearContent = () => {
    this.searchContent = "";
    this.notes = this.allNotes;
  }

  filterCategory = () => {
    this.clearContent();
    if (!this.searchCategory) {
      this.notes = this.allNotes.filter(n => n.category == this.searchCategory);
    }
    else {
      this.notes = this.allNotes.filter(n => n.category.toLowerCase().includes(this.searchCategory.toLowerCase()));      
    }
  }

  clearCategory = () => {
    this.searchCategory = "";
    this.notes = this.allNotes;
  }
}
