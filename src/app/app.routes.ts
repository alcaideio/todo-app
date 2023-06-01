import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "todos", loadChildren: () => import("./todos/todo.routes") },
  { path: "a", loadChildren: () => import("./a/a.routing") },
  { path: "b", loadChildren: () => import("./b/b.routing") },
  { path: "**", redirectTo: "todos", pathMatch: "full" },
];
