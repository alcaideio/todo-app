import { Routes } from '@angular/router';
import TodosComponent from './todos.component';

const routes: Routes = [{ path: '', loadComponent: () => TodosComponent }];

export default routes;
