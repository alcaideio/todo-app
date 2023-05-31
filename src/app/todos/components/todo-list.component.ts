import { NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "../todos.signal";
import { TodoItemComponent } from "./todo-item.component";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [NgIf, NgFor, TodoItemComponent],
  template: `
    <section id="main" class="main">
      <ul id="todo-list" class="todo-list">
        <app-todo-item
          *ngFor="let todo of todos; trackBy: todosTrackByFn"
          [todo]="todo"
          (toggle)="toggle.emit($event)"
          (update)="update.emit($event)"
          (delete)="delete.emit($event)"
        />
      </ul>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
  @Output() toggle = new EventEmitter<string>();
  @Output() update = new EventEmitter<{ id: string; text: string }>();
  @Output() delete = new EventEmitter<string>();

  todosTrackByFn(_: number, item: Todo): string {
    return item.id;
  }
}
