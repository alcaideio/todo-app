import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-b',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      b works!
    </p>
  `,
  styles: [
  ]
})
export class BComponent {

}
