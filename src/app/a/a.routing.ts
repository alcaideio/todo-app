import { Routes } from "@angular/router";
import { AComponent } from "./a.component";
import { AAComponent } from "./a/a.component";

const routes: Routes = [{ path: '', loadComponent: () => AComponent}, { path: 'test', loadComponent: () => AAComponent}]

export default routes