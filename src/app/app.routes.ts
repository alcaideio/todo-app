import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: ':filter', loadChildren: () => import('./todos/todo.routes') },
    { path: '**', redirectTo: 'all', pathMatch: 'full' },
];
