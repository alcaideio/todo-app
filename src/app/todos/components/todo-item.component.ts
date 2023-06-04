import {
   ChangeDetectionStrategy,
   Component,
   EventEmitter,
   Input,
   Output,
   signal,
} from '@angular/core';
import { Todo } from '../todos.signal';

@Component({
   selector: 'app-todo-item',
   standalone: true,
   template: `
      <li [class.completed]="todo.completed" [class.editing]="editing()">
         <div class="view">
            <input
               class="toggle"
               type="checkbox"
               [checked]="todo.completed"
               (click)="toggle.emit(todo.id)" />
            <!-- eslint-disable-next-line -->
            <label (dblclick)="onDblClick(textInput)">
               {{ todo.text }}
            </label>
            <!-- eslint-disable-next-line -->
            <button class="destroy" (click)="delete.emit(todo.id)"></button>
         </div>
         <input
            class="edit"
            type="text"
            #textInput
            [hidden]="editing()"
            [value]="todo.text"
            (keyup.enter)="updateText(todo.id, textInput.value)"
            (blur)="updateText(todo.id, textInput.value)" />
      </li>
   `,
   changeDetection: ChangeDetectionStrategy.OnPush,
   styles: [
      `
         :host {
            display: block;
         }

         .toggle,
         .destroy {
            cursor: pointer;
         }
      `,
   ],
})
export class TodoItemComponent {
   @Input({ required: true }) todo!: Todo;
   @Output() toggle = new EventEmitter<string>();
   @Output() update = new EventEmitter<{ id: string; text: string }>();
   @Output() delete = new EventEmitter<string>();

   editing = signal(false);

   updateText(id: string, text: string) {
      if (text && text.trim() !== this.todo?.text) {
         this.update.emit({ id, text: text.trim() });
      }

      this.editing.set(false);
   }

   onDblClick(input: HTMLInputElement) {
      this.editing.set(true);

      setTimeout(() => {
         input.focus();
      }, 0);
   }
}
