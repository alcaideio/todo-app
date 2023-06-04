import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodoFilter } from '../todos.signal';

@Component({
   selector: 'app-todo-footer',
   standalone: true,
   template: `
      <footer id="footer" class="footer">
         <span id="todo-count" class="todo-count">{{ incompleteTodosCount }} items left</span>
         <ul id="filters" class="filters">
            <li>
               <a
                  routerLink="/"
                  [queryParams]="{ completed: null }"
                  queryParamsHandling="merge"
                  [class.selected]="!currentFilter"
                  >All</a
               >
            </li>
            <li>
               <a
                  routerLink="/"
                  [queryParams]="{ completed: 'false' }"
                  queryParamsHandling="merge"
                  [class.selected]="currentFilter === 'false'"
                  >Active</a
               >
            </li>
            <li>
               <a
                  routerLink="/"
                  [queryParams]="{ completed: 'true' }"
                  queryParamsHandling="merge"
                  [class.selected]="currentFilter === 'true'"
                  >Completed</a
               >
            </li>
         </ul>
         <button
            id="clear-completed"
            *ngIf="hasCompletedTodos"
            class="clear-completed"
            (click)="clearCompleted.emit()">
            Clear completed
         </button>
      </footer>
   `,
   imports: [RouterLink, NgIf],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFooterComponent {
   @Input() hasCompletedTodos = false;
   @Input() incompleteTodosCount = 0;
   @Input() currentFilter?: TodoFilter;
   @Output() clearCompleted = new EventEmitter();
}
