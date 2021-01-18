import {Injectable} from '@angular/core';
import {Todo} from "./todo.model";
import * as moment from 'moment';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * Service, der alle Interaktionen mit den Todos händelt.
 */
export class StoreService {

  private url = 'https://done-ccf2e-default-rtdb.europe-west1.firebasedatabase.app/'

  //
  // /**
  //  * Alle Todos dieser Anwendung.
  //  */
  // todos: Todo[];
  //
  // /**
  //  * Alle gefilterten Todos.
  //  */
  // filteredTodos: Todo[];
  //
  // /**
  //  * String, der den aktuell angewandten Filter repräsentiert.
  //  */
  // filter = 'all';
  //
  // /**
  //  * Wenn vorhanden, werden Todos aus dem Speicher des Browsers.
  //  * Wurden noch keine Todos gespeichert, wird ein neues Array angelegt
  //  */
  // constructor() {
  //
  //   this.todos = new Array();
  //   const todoString = localStorage.getItem('todos');
  //   if (todoString) {
  //     this.parseTodos(todoString);
  //   }
  //
  //   this.filterTodos();
  // }
  //
  // /**
  //  * Speichert ein neu erstelltes Todo
  //  * @param todo - neu erstelltes Todo
  //  */
  // addTodo(todo: Todo) {
  //   this.todos.push(todo);
  //   this.todos.sort(this.compare);
  //   this.saveTodos();
  //   this.filterTodos();
  // }
  //
  // /**
  //  * Markiert ein bestehendes Todo als erledigt oder nicht erledigt.
  //  * @param checkedOffTodo - Soll das Todo als erledigt markiert werden?
  //  */
  // checkOff(checkedOffTodo: Todo) {
  //   this.todos.find(todo => todo.id === checkedOffTodo.id).done = !checkedOffTodo.done;
  //   this.saveTodos();
  //   this.filterTodos();
  // }
  //
  // /**
  //  * Löscht ein bestehendes Todo.
  //  * @param todoToDelete - zu löschendes Todo
  //  */
  // delete(todoToDelete: Todo) {
  //   this.todos.splice(this.todos.indexOf(todoToDelete), 1);
  //   this.saveTodos();
  //   this.filterTodos();
  // }
  //
  // /**
  //  * Bearbeitet ein bestehendes Todo.
  //  * @param editedTodo - bearbeitetes Todo
  //  */
  // editTodo(editedTodo: Todo) {
  //   this.todos[this.todos.indexOf(this.todos.find(todo => todo.id === editedTodo.id))] = editedTodo;
  //   this.todos.sort(this.compare);
  //   this.saveTodos();
  // }
  //
  // /**
  //  * Wird aufgerufen, wenn der Filter geändert wird.
  //  * @param filter
  //  */
  // onFilterChanged(filter: string) {
  //   this.filter = filter;
  //   this.filterTodos();
  // }
  //
  // /**
  //  * Speichert die Todos im Speicher des Browsers.
  //  * @private
  //  */
  // private saveTodos() {
  //   localStorage.setItem('todos', JSON.stringify(this.todos));
  // }
  //
  // /**
  //  * Filtert alle Todos
  //  * @private
  //  */
  // private filterTodos() {
  //   switch (this.filter) {
  //     case 'all':
  //       this.filteredTodos = this.todos.slice();
  //       break;
  //     case 'done':
  //       this.filteredTodos = this.todos.filter(todo => todo.done);
  //       break;
  //     case 'pending':
  //       this.filteredTodos = this.todos.filter(todo => !todo.done);
  //       break;
  //   }
  // }
  //
  // /**
  //  * Parsed die aus dem Browser-Speicher geladenen Daten
  //  * @param todoString - zu parsender String
  //  */
  // parseTodos(todoString: string) {
  //   let parsedTodos: Todo[] = JSON.parse(todoString);
  //   parsedTodos.map(parsedTodo => {
  //     let todo = new Todo(parsedTodo.title, parsedTodo.description, moment(parsedTodo.dueDate));
  //     todo.id = parsedTodo.id;
  //     todo.done = parsedTodo.done;
  //     this.todos.push(todo);
  //   });
  //   this.todos.sort(this.compare);
  // }
  //
  // compare(a: Todo, b: Todo) {
  //   return a.dueDate.diff(b.dueDate);
  // }


  /**
   * Alle Todos dieser Anwendung.
   */
  todos: Todo[] = new Array();

  /**
   * Alle gefilterten Todos.
   */
  filteredTodos: Todo[] = new Array();

  /**
   * String, der den aktuell angewandten Filter repräsentiert.
   */
  filter = 'all';

  error = new Subject<string>();
  /**
   * Wenn vorhanden, werden Todos aus dem Speicher des Browsers.
   * Wurden noch keine Todos gespeichert, wird ein neues Array angelegt
   */
  constructor( private http: HttpClient) {
    this.http.get(this.url + '/todos.json')
      .pipe(map(responseData => {
        const todos: Todo[] = new Array();
        for (const keyID in responseData) {
          for (const key in responseData[keyID]) {
            let todo: Todo = {...responseData[keyID][key]};
            todo.dueDate = moment(todo.dueDate);
            todos.push(todo);
          }
        }
        return todos;
      }))
      .subscribe(todos => {
        this.todos = todos;
        this.filterTodos()
    }, error => {
        if (error.status === 401) {
          this.error.next('Zugriff verweigert');
        }
      });
  }

  /**
   * Speichert ein neu erstelltes Todo
   * @param todo - neu erstelltes Todo
   */
  addTodo(todo: Todo) {

    this.http.post(this.url + '/todos/' + todo.id + '.json',
      todo
    ).subscribe(responseData => {
      console.log(responseData)
    });

    this.todos.push(todo);
    this.todos.sort(this.compare);
    this.filterTodos();
  }

  /**
   * Markiert ein bestehendes Todo als erledigt oder nicht erledigt.
   * @param checkedOffTodo - Soll das Todo als erledigt markiert werden?
   */
  checkOff(checkedOffTodo: Todo) {
    let updatedTodo = this.todos.find(todo => todo.id === checkedOffTodo.id)
      updatedTodo.done = !checkedOffTodo.done;
    this.http.put(this.url + '/todos/' + updatedTodo.id + '.json', updatedTodo).subscribe(responseData => {
      console.log(responseData);
    });
    this.filterTodos();
  }

  /**
   * Löscht ein bestehendes Todo.
   * @param todoToDelete - zu löschendes Todo
   */
  delete(todoToDelete: Todo) {
    this.todos.splice(this.todos.indexOf(todoToDelete), 1);
    this.http.delete(this.url + '/todos/' + todoToDelete.id + '.json').subscribe(responseData => {
      console.log(responseData);
    });
    this.filterTodos();
  }

  /**
   * Bearbeitet ein bestehendes Todo.
   * @param editedTodo - bearbeitetes Todo
   */
  editTodo(editedTodo: Todo) {
    this.todos[this.todos.indexOf(this.todos.find(todo => todo.id === editedTodo.id))] = editedTodo;
    //this.http.put(this.url + '/todos/' + editedTodo.id + '.json', editedTodo).subscribe(responseData => {
    this.http.delete(this.url + '/todos/' + editedTodo.id + '.json').subscribe(responseData => {
      console.log(responseData);
    });
    this.http.post(this.url + '/todos/' + editedTodo.id + '.json',
      editedTodo
    ).subscribe(responseData => {
      console.log(responseData)
    });
    this.todos.sort(this.compare);
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
   * Filtert alle Todos
   * @private
   */
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

    console.log('filteredTodos ' + this.filteredTodos);
  }

  compare(a: Todo, b: Todo) {
    return a.dueDate.diff(b.dueDate);
  }


}
