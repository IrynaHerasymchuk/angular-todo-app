import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() saveTodo = new EventEmitter<string>();

  todoForm = new FormGroup({
    todoTitle: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(280)]
    }),
  });

  get todoTitle() {
    return this.todoForm.get('todoTitle') as FormControl;
  }

  handleFormSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    this.saveTodo.emit(this.todoTitle.value);
    this.todoForm.reset();
  }
}
