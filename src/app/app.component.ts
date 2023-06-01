import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { QuicklinkModule } from "ngx-quicklink";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, QuicklinkModule],
  template: `
  <nav>
    <ul>
      <li><a routerLink="/todos">todos</a></li>
      <li><a routerLink="/a">Route A</a></li>
      <li><a routerLink="/b">Route B</a></li>
    </ul>
  </nav>
    <section class="todoapp">
      <router-outlet></router-outlet>
    </section>

    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>
        My github Repo <a href="https://github.com/alcaidio/ng-todomvc">alcaidio/ng-todomvc</a>
      </p>
      <p>
        Based on <a href="http://todomvc.com">TodoMVC</a> and inspired by <a href="https://github.com/nartc">Nartc</a>
      </p>
    </footer>
  `,
})
export class AppComponent {}
