import { HttpClient } from '@angular/common/http';
import { InjectionToken, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

export interface Todo {
   id: string;
   text: string;
   creationDate: number;
   completed: boolean;
}

export enum TodoFilter {
   ACTIVE = 'false',
   COMPLETED = 'true',
}

function todosFactory(route = inject(ActivatedRoute), http = inject(HttpClient)) {
   const todos = signal<Todo[]>([]);
   const hasTodos = computed(() => todos().length > 0);
   const hasCompletedTodos = computed(() => todos().some(todo => todo.completed));
   const incompleteTodosCount = computed(() => todos().filter(todo => !todo.completed).length);
   const completedQueryParam = toSignal(route.queryParams.pipe(map(q => q['completed'])));
   const sortByDateQueryParam = toSignal(route.queryParams.pipe(map(q => q['sortByDate'])));

   const filteredTodos = computed(() => {
      switch (completedQueryParam()) {
         case TodoFilter.ACTIVE:
            return todos().filter(todo => !todo.completed);
         case TodoFilter.COMPLETED:
            return todos().filter(todo => todo.completed);
         default:
            return todos();
      }
   });

   const _todos = computed(() => {
      switch (sortByDateQueryParam()) {
         default:
         case 'asc':
            return filteredTodos().sort((a, b) => b.creationDate - a.creationDate);
         case 'desc':
            return filteredTodos().sort((a, b) => a.creationDate - b.creationDate);
      }
   });

   http
      .get<Todo[]>('assets/todos.json')
      .pipe(tap(console.log), takeUntilDestroyed())
      .subscribe(resp => todos.set(resp));

   return {
      completedQueryParam,
      todos: _todos,
      hasTodos,
      hasCompletedTodos,
      incompleteTodosCount,
      add: (text: string) => {
         const newTodo = {
            id: Math.random().toString(32).slice(2),
            text,
            creationDate: new Date().getTime(),
            completed: false,
         };

         todos.update(v => [...v, newTodo]);
      },
      toggle: (id: string) => {
         todos.mutate(v => {
            const todo = v.find(todo => todo.id === id);

            if (todo) todo.completed = !todo.completed;
         });
      },
      delete: (id: string) => {
         todos.update(v => v.filter(todo => todo.id !== id));
      },
      update: (id: string, text: string) => {
         todos.mutate(v => {
            const todo = v.find(todo => todo.id === id);

            if (todo) todo.text = text;
         });
      },
      clearComplete: () => {
         todos.update(v => v.filter(todo => !todo.completed));
      },
   };
}

export const TODOS_STORE = new InjectionToken<ReturnType<typeof todosFactory>>(
   'TodosStore with Signals'
);

export function provideTodosStore() {
   return { provide: TODOS_STORE, useFactory: todosFactory };
}
