import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: Task[] = [{
    description: 'Task 1',
    done: false
  },
  {
    description: 'Task 2',
    done: false
  },
  {
    description: 'Task 5',
    done: false
  }];
  inprogress: Task[] = [{
    description: 'Task 3',
    done: false
  },
  {
    description: 'Task 4',
    done: false
  }];
  done: Task[] = [{
    description: 'Task 6',
    done: false
  }];
  updateIndex: any;
  isEditEnabled: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      item: ['', Validators.required]
    });
  }

  addTask(): void {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    });

    this.todoForm.reset();
  }

  onEdit(item: Task, index: number): void {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = index;
    this.isEditEnabled = true;
  }

  updateTask(): void {
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  deleteInprogressTask(index: number): void {
    this.inprogress.splice(index, 1);
  }

  deleteDoneTask(index: number): void {
    this.done.splice(index, 1);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
