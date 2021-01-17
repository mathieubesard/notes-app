import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  preserveWhitespaces: true
})
export class NoteComponent implements OnInit {
  @Input() note: any;
  @Output() deletedNote = new EventEmitter<string>();

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  updateNote = (id: string) => {
    console.log('updateNote ' + id);
    this.apiService.updateNote(this.note.id, this.note.content, this.note.category).subscribe((result: any) => {
    });
  }

  onDeleteNoteClick = () => {
    this.deletedNote.emit(this.note.id);
  }
}
