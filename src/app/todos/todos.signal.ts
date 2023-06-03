import { HttpClient } from '@angular/common/http';
import { InjectionToken, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

export interface Todo {
   id: string;
   text: string;
   creationDate: number;
   completed: boolean;
}

export enum TodoFilter {
   ALL = 'all',
   ACTIVE = 'false',
   COMPLETED = 'true',
}

const INITIAL_TODOS = JSON.parse(localStorage.getItem('todos') || '') || [];

function todosSignalFactory(route = inject(ActivatedRoute), http = inject(HttpClient)) {
   const todosSignal = signal<Todo[]>([]);
   const hasTodos = computed(() => todosSignal().length > 0);
   const hasCompletedTodos = computed(() => todosSignal().some(todo => todo.completed));
   const incompleteTodosCount = computed(
      () => todosSignal().filter(todo => !todo.completed).length
   );
   const completedQueryParam = toSignal(route.queryParams.pipe(map(q => q['completed'])));

   const sortByDateQueryParam = toSignal(route.queryParams.pipe(map(q => q['sortByDate'])));

   const filteredTodos = computed(() => {
      switch (completedQueryParam()) {
         default:
         case TodoFilter.ALL:
            return todosSignal();
         case TodoFilter.ACTIVE:
            return todosSignal().filter(todo => !todo.completed);
         case TodoFilter.COMPLETED:
            return todosSignal().filter(todo => todo.completed);
      }
   });

   const todos = computed(() => {
      switch (sortByDateQueryParam()) {
         default:
         case 'asc':
            return filteredTodos().sort((a, b) => b.creationDate - a.creationDate);
         case 'desc':
            return filteredTodos().sort((a, b) => a.creationDate - b.creationDate);
      }
   });

   // NOTES: we can do it with async await and fetch
   const fetchTodos$ = () => http.get<Todo[]>('assets/todos.json');

   effect(() => {
      if (todosSignal().length) {
         localStorage.setItem('todos', JSON.stringify(todosSignal()));
      } else {
         fetchTodos$().subscribe(resp => todosSignal.set(resp));
      }
   });

   return {
      completedQueryParam,
      todos,
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

         todosSignal.update(v => [...v, newTodo]);
      },
      toggle: (id: string) => {
         todosSignal.mutate(v => {
            const todo = v.find(todo => todo.id === id);

            if (todo) todo.completed = !todo.completed;
         });
      },
      delete: (id: string) => {
         todosSignal.update(v => v.filter(todo => todo.id !== id));
      },
      update: (id: string, text: string) => {
         todosSignal.mutate(v => {
            const todo = v.find(todo => todo.id === id);

            if (todo) todo.text = text;
         });
      },
      clearComplete: () => {
         todosSignal.update(v => v.filter(todo => !todo.completed));
      },
   };
}

export const TODOS_STORE = new InjectionToken<ReturnType<typeof todosSignalFactory>>(
   'TodosStore with Signals'
);

export function provideTodosStore() {
   return { provide: TODOS_STORE, useFactory: todosSignalFactory };
}
