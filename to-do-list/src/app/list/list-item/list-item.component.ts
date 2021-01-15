import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../shared/todo.model";
import {StoreService} from "../../shared/store.service";

/**
 * Diese Komponente stellt ein Listenelement in der Liste der Todos dar.
 */
@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  /**
   * Todo, das in diesem Listenelement angezeigt werden soll.
   */
  @Input() todo: Todo;

  /**
   * Gibt an, ob dieser Kommentar bearbeitet werden soll.
   */
  @Output() editMode = new EventEmitter<Todo>();

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
  }

  /**
   * Wird aufgerufen, wenn sich der Status des Todos dieses Listenelements
   * bezüglich erledigt/nicht erledigt ändert.
   * @param event - Klickevent
   */
  checkOff(event: any) {
    event.stopPropagation();
    this.storeService.checkOff(this.todo);
  }

  /**
   * Wird aufgerufen, wenn der Todo dieses Listenelements gelöscht werden soll.
   * @param event - Klickevent
   */
  delete(event: any) {
    event.stopPropagation();
    this.storeService.delete(this.todo);
  }

  /**
   * Wird aufgerufen, wenn der Todo dieses Listenelements bearbeitet werden soll.
   * @param event - Klickevent
   */
  edit(event: any) {
    event.stopPropagation();
    this.editMode.emit(this.todo);
  }
}
