import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NewTodoComponent } from './components/new-todo.component';
import { TodoFooterComponent } from './components/todo-footer.component';
import { TodoListComponent } from './components/todo-list.component';
import { TODOS_STORE, provideTodosStore } from './todos.signal';

@Component({
   standalone: true,
   template: `
      <header class="header">
         <h1>todos</h1>
         <app-new-todo (addTodo)="todosStore.add($event)" />
      </header>
      <app-todo-list
         *ngIf="todosStore.hasTodos()"
         [todos]="todosStore.todos()"
         (toggle)="todosStore.toggle($event)"
         (update)="todosStore.update($event.id, $event.text)"
         (delete)="todosStore.delete($event)" />
      <app-todo-footer
         *ngIf="todosStore.hasTodos()"
         [hasCompletedTodos]="todosStore.hasCompletedTodos()"
         [incompleteTodosCount]="todosStore.incompleteTodosCount()"
         [currentFilter]="todosStore.completedQueryParam()"
         (clearCompleted)="todosStore.clearComplete()" />
   `,
   providers: [provideTodosStore()],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [NgIf, NewTodoComponent, TodoListComponent, TodoFooterComponent],
})
export default class TodosComponent {
   readonly todosStore = inject(TODOS_STORE);
}
