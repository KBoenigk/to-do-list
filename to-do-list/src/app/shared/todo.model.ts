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
  dueDate: string;

  /**
   * Status des Todos bezüglich der Erledigung des Todos
   */
  done: boolean;

  constructor(title: string, description: string, dueDate: string) {
    // Die aktuellen Millisekunden werden als
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.done = false;
  }
}