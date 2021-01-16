import { Injectable } from '@angular/core';
import {Todo} from "./todo.model";

@Injectable({
  providedIn: 'root'
})
/**
 * Service, der alle Interaktionen mit den Todos händelt.
 */
export class StoreService {

  /**
   * Alle Todos dieser Anwendung.
   */
  todos: Todo[];

  /**
   * Alle gefilterten Todos.
   */
  filteredTodos: Todo[];

  /**
   * String, der den aktuell angewandten Filter repräsentiert.
   */
  filter = 'all';

  /**
   * Wenn vorhanden, werden Todos aus dem Speicher des Browsers.
   * Wurden noch keine Todos gespeichert, wird ein neues Array angelegt
   */
  constructor() {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      this.todos = JSON.parse(todoString);
    } else {
      this.todos = new Array();
    }
    this.filterTodos();
  }

  /**
   * Speichert ein neu erstelltes Todo
   * @param todo - neu erstelltes Todo
   */
  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveTodos();
    this.filterTodos();
  }

  /**
   * Markiert ein bestehendes Todo als erledigt oder nicht erledigt.
   * @param checkedOffTodo - Soll das Todo als erledigt markiert werden?
   */
  checkOff(checkedOffTodo: Todo) {
    this.todos.find(todo => todo.id === checkedOffTodo.id).done = !checkedOffTodo.done;
    this.saveTodos();
    this.filterTodos();
  }

  /**
   * Löscht ein bestehendes Todo.
   * @param todoToDelete - zu löschendes Todo
   */
  delete(todoToDelete: Todo) {
    this.todos.splice(this.todos.indexOf(todoToDelete), 1);
    this.saveTodos();
    this.filterTodos();
  }

  /**
   * Bearbeitet ein bestehendes Todo.
   * @param editedTodo - bearbeitetes Todo
   */
  editTodo(editedTodo: Todo) {
    this.todos[this.todos.indexOf(this.todos.find(todo => todo.id === editedTodo.id))] = editedTodo;
  }

  /**
   * Wird aufgerufen, wenn der Filter geändert wird.
   * @param filter
   */
  onFilterChanged(filter: string) {
    this.filter = filter;
    this.filterTodos();
  }

  /**
   * Speichert die Todos im Speicher des Browsers.
   * @private
   */
  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private filterTodos() {
    switch (this.filter) {
      case 'all':
        this.filteredTodos = this.todos.slice();
        break;
      case 'done':
        this.filteredTodos = this.todos.filter(todo => todo.done);
        break;
      case 'pending':
        this.filteredTodos = this.todos.filter(todo => !todo.done);
        break;
    }
  }
}
