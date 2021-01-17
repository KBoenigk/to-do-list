import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoreService} from "../shared/store.service";
import {Todo} from "../shared/todo.model";
import {Observable} from "rxjs";

/**
 * Bei dieser Komponente handelt es sich um die Darstellung der Todos als Liste.
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  /**
   * Gibt an, ob ein Todo bearbeitet werden soll.
   */
  @Output() editMode = new EventEmitter<Todo>();

  constructor(public storeService: StoreService) { }

  shownTodos = 5;

  ngOnInit(): void {
  }

  /**
   * Wird aufgerufen, wenn ein Todo der Liste bearbeitet werden soll.
   * @param todo - zu bearbeitender Todo
   */
  onEditMode(todo: Todo) {
    this.editMode.emit(todo);
  }

  resetShownTodos() {
    this.shownTodos = 5;
  }

  loadMore() {
    this.shownTodos += 5;
  }
}
