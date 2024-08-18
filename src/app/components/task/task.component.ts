import {Component, Input} from '@angular/core'
import {DatePipe} from '@angular/common'
import Task from '../../interfaces/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    DatePipe
  ],
  template: `
    <div class="task">
      <h3>{{task.taskName}}</h3>
      <p>à faire avant le : {{task.taskDate | date:'EEEE dd MMMM YYYY':'':'fr-FR' }}</p>
    </div>
  `,
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({required: true}) task!: Task;
}
