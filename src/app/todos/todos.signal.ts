import { HttpClient } from '@angular/common/http';
import { InjectionToken, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

export enum TodoFilter {
    ALL = "all",
    ACTIVE = "active",
    COMPLETED = "completed",
  }

export interface Todo {
    id: string;
    text: string;
    creationDate: Date;
    completed: boolean;
}

const INITIAL_TODOS = JSON.parse(localStorage.getItem('todos') || "") || []

function todosSignalFactory(route = inject(ActivatedRoute), http = inject(HttpClient)) {
    const todos = signal<Todo[]>(INITIAL_TODOS);
    const filterQueryParam = toSignal(route.queryParams.pipe(map((q) => q['filter'])));
    const hasTodos = computed(() => todos().length > 0);
    const hasCompletedTodos = computed(() => todos().some((todo) => todo.completed));
    const incompleteTodosCount = computed(() => todos().filter((todo) => !todo.completed).length);

    const filteredTodos = computed(() => {
        switch (filterQueryParam()) {
            default:
            case TodoFilter.ALL:
                return todos();
            case TodoFilter.ACTIVE:
                return todos().filter((todo) => !todo.completed);
            case TodoFilter.COMPLETED:
                return todos().filter((todo) => todo.completed);
        }
    });

    // NOTES: we can do it with async await and fetch
    const fetchTodos$ = () => http.get<Todo[]>('assets/todos.json')

    effect(() => {
        if(todos().length) {
            localStorage.setItem('todos', JSON.stringify(todos()))
        } else {
            fetchTodos$().subscribe(resp => todos.set(resp))
        }
    })
    
    return {
        filterQueryParam,
        filteredTodos,
        hasTodos,
        hasCompletedTodos,
        incompleteTodosCount,
        add: (text: string) => {
            const newTodo = {
                id: Math.random().toString(32).slice(2),
                text,
                creationDate: new Date(),
                completed: false,
              };

            todos.update((v) => ([...v, newTodo]));
        },
        toggle: (id: string) => {
            todos.mutate((v) => {
                const todo = v.find((todo) => todo.id === id);
                if (todo) todo.completed = !todo.completed;
            });
        },
        delete: (id: string) => {
            todos.update((v) => v.filter((todo) => todo.id !== id));
        },
        update: (id: string, text: string) => {
            todos.mutate((v) => {
                const todo = v.find((todo) => todo.id === id);
                if (todo) todo.text = text;
            });
        },
        clearComplete: () => {
            todos.update((v) => v.filter((todo) => !todo.completed));
        },
    };
}

export const TODOS_STORE = new InjectionToken<ReturnType<typeof todosSignalFactory>>('TodosStore with Signals');

export function provideTodosStore() {
    return { provide: TODOS_STORE, useFactory: todosSignalFactory };
}