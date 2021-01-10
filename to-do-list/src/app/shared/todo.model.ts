export class Todo {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  done: boolean;

  constructor(title: string, description: string, dueDate: string) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.done = false;
  }
}
