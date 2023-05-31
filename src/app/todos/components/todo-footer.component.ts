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
                    <a routerLink="/" [queryParams]=""  [class.selected]="currentFilter === 'all'">All</a>
                </li>
                <li>
                    <a routerLink="/" [queryParams]="{filter: 'active'}" [class.selected]="currentFilter === 'active'">Active</a>
                </li>
                <li>
                    <a routerLink="/" [queryParams]="{filter: 'completed'}" [class.selected]="currentFilter === 'completed'">Completed</a>
                </li>
            </ul>
            <button
                id="clear-completed"
                *ngIf="hasCompletedTodos"
                class="clear-completed"
                (click)="clearCompleted.emit()"
            >
                Clear completed
            </button>
        </footer>
    `,
    imports: [RouterLink, NgIf],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFooterComponent {
    @Input() hasCompletedTodos = false;
    @Input() incompleteTodosCount = 0;
    @Input() currentFilter: TodoFilter = TodoFilter.ALL;
    @Output() clearCompleted = new EventEmitter();
}