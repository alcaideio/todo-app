import { Routes } from "@angular/router";
import { BComponent } from "./b.component";

const routes: Routes = [{ path: '', loadComponent: () => BComponent}]

export default routes