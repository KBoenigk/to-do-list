import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../../shared/todo.model";
import {StoreService} from "../../shared/store.service";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() editMode = new EventEmitter<Todo>();

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
  }

  checkOff(event: any) {
    event.stopPropagation();
    this.storeService.checkOff(this.todo);
  }

  delete(event: any) {
    event.stopPropagation();
    this.storeService.delete(this.todo);
  }

  edit(event: any) {
    event.stopPropagation();
    this.editMode.emit(this.todo);
  }
}
