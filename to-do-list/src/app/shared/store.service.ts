import { Injectable } from '@angular/core';
import {Todo} from "./todo.model";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  todos: Todo[];
  constructor() {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      this.todos = JSON.parse(todoString);
    } else {
      this.todos = new Array();
    }

  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveTodos();
  }

  checkOff(checkedOffTodo: Todo) {
    this.todos.find(todo => todo.id === checkedOffTodo.id).done = !checkedOffTodo.done;
    this.saveTodos();
  }

  delete(todoToDelete: Todo) {
    this.todos.splice(this.todos.indexOf(todoToDelete), 1);
    this.saveTodos();
  }

  editTodo(editedTodo: Todo) {
    this.todos[this.todos.indexOf(this.todos.find(todo => todo.id === editedTodo.id))] = editedTodo;
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
