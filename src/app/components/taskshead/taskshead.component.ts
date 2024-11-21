import {Component, Input, OnChanges, signal, SimpleChanges} from '@angular/core'
import Task from '../../interfaces/task'

@Component({
  selector: 'app-taskshead',
  standalone: true,
  imports: [],
  template: `
    <h3>
      {{ messageSig() }}
    </h3>
  `,
  styles: ``
})
export class TasksheadComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    const nbTasks = changes['tasks'].currentValue.length;
    const tasksPluralize = nbTasks > 1 ? 's' : '';
    this.messageSig.set(`${nbTasks} tâche${tasksPluralize}`);
    console.log(`Nombre de tache: ${nbTasks}`);
  }

  @Input({required: true}) tasks!: Task[];

  messageSig = signal<string>('')

}
