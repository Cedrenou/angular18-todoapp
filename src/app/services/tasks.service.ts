import {Injectable, signal} from '@angular/core'
import Task from '../interfaces/task'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasksSignal = signal<Task[]>([
    {
      id: '1',
      taskName: 'Faire la vaisselle',
      taskDate: new Date('2021-10-15'),
      done: false
    },
    {
      id: '2',
      taskName: 'Sortir le chien',
      taskDate: new Date('2021-10-17'),
      done: false
    },
  ]);

  createTask(taskName: string, taskDate: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      taskName,
      taskDate: new Date(taskDate),
      done: false
    }
    this.tasksSignal.update(tasks => [newTask, ...tasks]);
    console.log(this.tasksSignal());
  }

  readTasks(): Task[] {
    return this.tasksSignal();
  }
}
