import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StoreService} from "../shared/store.service";
import {Todo} from "../shared/todo.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Output() editMode = new EventEmitter<Todo>();

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
  }

  onEditMode(todo: Todo) {
    this.editMode.emit(todo);
  }
}
