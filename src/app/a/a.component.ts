import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-a',
  standalone: true,
  imports: [RouterLink],
  template: `
    <p>
      a works!

      <a routerLink="/a/test">aa page</a>
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AComponent {

}
