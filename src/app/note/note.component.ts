import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() note: any;
  @Output() deletedNote = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onUpdateNoteClick = () => {
    console.log('onUpdateNoteClick');
  }

  onDeleteNoteClick = () => {
    this.deletedNote.emit(this.note);
  }
}
