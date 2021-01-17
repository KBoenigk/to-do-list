import {Component, ViewChild} from '@angular/core';
import {StoreService} from "./shared/store.service";
import {Todo} from "./shared/todo.model";
import {BehaviorSubject, Observable} from "rxjs";
import {ListComponent} from "./list/list.component";

/**
 * Komponente, die das Grundgerüst der App darstellt.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('todolist') todoList: ListComponent;

  /**
   * Titel der Anwendung.
   */
  title = 'to-do-list';

  /**
   * Soll gerade ein Todo bearbeitet werden?
   */
  editMode = false;

  /**
   * Zu bearbeitendes Todo
   */
  todo: Todo;

  shownTodos=5;
  constructor(private storeService: StoreService) {
  }

  /**
   * Wird aufgerufen, wenn ein neues Todo hinzugefügt werden soll.
   */
  add() {
    this.editMode = true;
  }

  /**
   * Wird aufgerufen, wenn die Bearbeitung eines Todos abgeschlossen wurde.
   * @param editCompleted - Wurde das bearbeiten beendet?
   */
  onEditCompleted(editCompleted: boolean) {
    this.editMode = !editCompleted;
    this.todo = null;
  }

  /**
   * Wird aufgerufen, wenn ein Todo bearbeitet werden soll.
   * @param todo - Todo, das bearbeitet werden soll
   */
  onEditMode(todo: Todo) {
    this.todo = todo;
    this.editMode = true;
  }

  filterTodos(filter: string) {
    this.storeService.onFilterChanged(filter);
    this.todoList.resetShownTodos();
  }
}
