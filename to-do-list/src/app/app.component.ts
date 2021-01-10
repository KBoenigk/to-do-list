import { Component } from '@angular/core';
import {StoreService} from "./shared/store.service";
import {Todo} from "./shared/todo.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to-do-list';
  editMode = false;
  todo: Todo;

  constructor(private storeService: StoreService) {
  }

  add() {
    this.editMode = true;
  }

  onEditCompleted(editCompleted: boolean) {
    this.editMode = !editCompleted;
    this.todo = null;
  }

  onEditMode(todo: Todo) {
    this.todo = todo;
    this.editMode = true;
  }
}
