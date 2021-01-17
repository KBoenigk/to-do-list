import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Todo} from "../../shared/todo.model";
import {StoreService} from "../../shared/store.service";
import * as moment from 'moment';

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
   * Die Priorität des Todos dieses Listenelements
   */
  priority: number;

  /**
   * Gibt an, ob dieser Kommentar bearbeitet werden soll.
   */
  @Output() editMode = new EventEmitter<Todo>();

  constructor(private storeService: StoreService) { }

  /**
   * Berechnet die Priorität des Todos dieses Listenelements
   */
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

  getPriority(): number {
    return moment.duration(this.todo.dueDate.diff(moment.now())).asDays();
  }
}
