import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoreService} from "../shared/store.service";
import {Todo} from "../shared/todo.model";
import {FormControl} from "@angular/forms";
import * as moment from 'moment';



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
   * Wird der Todo neu erstellt?
   * @private
   */
  private isNewTodo = false;

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
      this.todo = new Todo('', '', '')
      this.title = 'New Todo';
    } else {
      this.title = 'Edit Todo';
    }

    this.dueDate = new FormControl(moment(this.todo.dueDate));
  }

  /**
   * Speichert das bearbeitete Todo über den storeService.
   * @param title - Titel des Todos
   * @param dueDate - Fälligkeitsdatum des Todos
   * @param description - Beschreibung des Todos
   */
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

  /**
   * Informiert die anderen Komponenten, dass das Bearbeiten beendet wurde. Änderungen werden nicht gespeichert.
   */
  cancel() {
    this.editCompleted.emit(true);
  }
}
