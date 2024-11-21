import {Component, inject, OnInit} from '@angular/core'
import { RouterOutlet } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import {TasksService} from './services/tasks.service'
import Task from './interfaces/task';
import {JsonPipe} from '@angular/common'
import {TaskComponent} from './components/task/task.component'
import {TasksheadComponent} from './components/taskshead/taskshead.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe, TaskComponent, TasksheadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit():void {
    this.tasks = this.taskService.readTasks()
    console.log(this.tasks)
  }

  taskForm = new FormGroup({
    taskName: new FormControl(''),
    taskDate: new FormControl(''),
  });

  private taskService = inject(TasksService);
  tasks: Task[] = [];

  addTask(event: Event): void {
    event.preventDefault();
    const taskName = this.taskForm.value.taskName;
    const taskDate = this.taskForm.value.taskDate;
    this.taskService.createTask(taskName!, taskDate!);
    this.tasks = this.taskService.readTasks();
    this.taskForm.reset();
  }

  updateTaskStatus(status: boolean, id: string): void {
    this.taskService.updateTaskStatus(id, status);
    this.tasks = this.taskService.readTasks();
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.readTasks();
  }
}
