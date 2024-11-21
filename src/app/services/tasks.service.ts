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
      taskDate: new Date('2021-09-30'),
      done: false
    },
    {
      id: '2',
      taskName: 'Faire le ménage',
      taskDate: new Date('2021-09-30'),
      done: true
    }
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

  updateTaskStatus(id: string, status: boolean): void {
    this.tasksSignal.update((tasks => tasks.map(task => task.id !== id ? task : {...task, done: status})
    ));
  }

  deleteTask(id: string): void {
    this.tasksSignal.update(tasks => tasks.filter(task => task.id !== id));
  }


}
