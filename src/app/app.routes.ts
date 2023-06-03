import { Routes } from '@angular/router';

export const routes: Routes = [
   { path: 'todos', loadChildren: () => import('./todos/todo.routes') },
   { path: '**', redirectTo: 'todos', pathMatch: 'full' },
];
