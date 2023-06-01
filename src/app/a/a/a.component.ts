import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-a',
  standalone: true,
  template: `
    <p>
      aa works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AAComponent {

}
