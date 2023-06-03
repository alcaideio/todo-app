import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [RouterOutlet],
   template: `
      <section class="todoapp">
         <router-outlet></router-outlet>
      </section>

      <footer class="info">
         <p>Double-click to edit a todo</p>
         <p>
            My github Repo
            <a href="https://github.com/alcaidio/ng-todomvc">alcaidio/ng-todomvc</a>
         </p>
         <p>
            Based on <a href="http://todomvc.com">TodoMVC</a> and inspired by
            <a href="https://github.com/nartc">Nartc</a>
         </p>
      </footer>
   `,
})
export class AppComponent {}
