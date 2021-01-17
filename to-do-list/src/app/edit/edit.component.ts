import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {StoreService} from "../shared/store.service";
import {Todo} from "../shared/todo.model";
import {NgForm} from '@angular/forms';


/**
 * Diese Komponente stellt die Oberfläche zum Erstellen und Bearbeiten von Todos dar
 */
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  /**
   * Teilt den anderen Komponenten mit, dass das Bearbeiten abgeschlossen ist.
   */
  @Output() editCompleted = new EventEmitter<boolean>();

  /**
   * Todo, der hier bearbeitet wird.
   */
  @Input() todo: Todo;

  /**
   * Eingabeformular zum Bearbeiten und Erstellen von Todos
   */
  @ViewChild('todoForm') todoForm: NgForm;

  /**
   * Wird der Todo neu erstellt?
   * @private
   */
  private isNewTodo = false;

  /**
   * Titel der Bearbeiten-Ansicht
   */
  title: string;

  /**
   * Fälligkeitsdatum des Todos
   */
  dueDate;


  constructor(private storeService: StoreService) { }

  /**
   * Prüft, ob ein vorhandenes Todo bearbeitet werden soll oder ob ein neues erstellt werden soll.
   */
  ngOnInit(): void {

    if (!this.todo) {
      this.isNewTodo = true;
      this.todo = new Todo('', '', null)
      this.title = 'New Todo';
    } else {
      this.title = 'Edit Todo';
    }

    // this.dueDate = new FormControl(moment(this.todo.dueDate));
  }

  /**
   * Informiert die anderen Komponenten, dass das Bearbeiten beendet wurde. Änderungen werden nicht gespeichert.
   */
  cancel() {
    this.editCompleted.emit(true);
  }

  /**
   * Speichert den neue oder bearbeitete Todo
   */
  onSubmit() {
    this.todo.title = this.todoForm.value.title;
    this.todo.dueDate = this.todoForm.value.dueDate;
    this.todo.description = this.todoForm.value.description;
    if (this.isNewTodo) {
      this.storeService.addTodo(this.todo);
    } else {
      this.storeService.editTodo(this.todo);
    }

    this.editCompleted.emit(true);
  }
}
