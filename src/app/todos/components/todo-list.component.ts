import { animate, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todos.signal';
import { TodoItemComponent } from './todo-item.component';

@Component({
   selector: 'app-todo-list',
   standalone: true,
   imports: [NgIf, NgFor, TodoItemComponent],
   template: `
      <section id="main" class="main">
         <ul id="todo-list" class="todo-list">
            <ng-container *ngFor="let todo of todos; trackBy: todosTrackByFn">
               <app-todo-item
                  @fadeOut
                  [todo]="todo"
                  (toggle)="toggle.emit($event)"
                  (update)="update.emit($event)"
                  (delete)="delete.emit($event)" />
            </ng-container>
         </ul>
      </section>
   `,
   changeDetection: ChangeDetectionStrategy.OnPush,
   animations: [
      trigger('fadeOut', [
         transition(':enter', [
            style({ opacity: 0, transform: 'translateX(0)' }),
            animate('500ms ease', style({ opacity: 1 })),
         ]),
         transition(':leave', [
            style({ opacity: 1 }),
            animate('350ms ease', style({ opacity: 0, transform: 'translateX(20px)' })),
         ]),
      ]),
   ],
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
