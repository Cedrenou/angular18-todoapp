import {Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges} from '@angular/core'
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
      <p class="task-footer">
        <span>
          <input type="checkbox"
                 [id]="task.id"
                 (change)="handleTaskState($event)"
                 [checked]="isDoneSig()"
          />
          <label [for]="task.id">{{ isDoneSig() ? 'fait' : 'à faire' }}</label>
        </span>
        &nbsp; <button (click)="handleTaskDelete()" class="delete-button">Delete</button>
      </p>
    </div>
  `,
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnChanges {
  @Input({required: true}) task!: Task;
  @Output() onTaskStatusChange: EventEmitter<any> = new EventEmitter();
  @Output() OnTaskDelete: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    this.isDoneSig.set(changes['task'].currentValue.done);
  }

  isDoneSig = signal<boolean>(false);

  handleTaskState(event: Event) {
    this.isDoneSig.update((status) => !status);
    this.onTaskStatusChange.emit([this.isDoneSig(), this.task.id]);
  }

  handleTaskDelete() {
    this.OnTaskDelete.emit(this.task.id);
  }
}
