import {Moment} from "moment";

/**
 * Repräsentation eines Todos.
 */
export class Todo {
  /**
   * Eindeutige Identifikation des Todos.
   */
  id: number;

  /**
   * Titel des Todos.
   */
  title: string;

  /**
   * Beschreibung des Todos.
   */
  description: string;

  /**
   * Fälligkeitsdatum des Todos
   */
  dueDate: Moment;

  /**
   * Status des Todos bezüglich der Erledigung des Todos
   */
  done: boolean;

  constructor(title: string, description: string, dueDate: Moment) {
    // Die aktuellen Millisekunden werden als
    //this.id = Date.now();
    this.id = Math.floor((Math.random() * 1000000) + 1);
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.done = false;
  }
}
