import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoreService} from "../shared/store.service";
import {Todo} from "../shared/todo.model";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @Output() editCompleted = new EventEmitter<boolean>();
  @Input() todo: Todo;
  private isNewTodo = false;

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    if (!this.todo) {
      this.isNewTodo = true;
      this.todo = new Todo('', '', '')
    }
  }

  save(title: string, dueDate: string, description: string) {
    this.todo.title = title;
    this.todo.dueDate = dueDate;
    this.todo.description = description;
    if (this.isNewTodo) {
      this.storeService.addTodo(this.todo);
    } else {
      this.storeService.editTodo(this.todo);
    }

    this.editCompleted.emit(true);
  }

}
