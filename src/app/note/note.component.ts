import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input() note: any;
  @Output() deleted = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteClick = () => {
    this.deleted.emit(this.note.content);
  }
}
