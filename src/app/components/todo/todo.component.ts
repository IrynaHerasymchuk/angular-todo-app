import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  @Output() deleteTodo = new EventEmitter();
  @Output() renameTodo = new EventEmitter<string>();
  @Output() toggleTodo = new EventEmitter();

  @Input() todo!: Todo;

  @ViewChild('todoTitleField')
  set todoTitleField(field: ElementRef) {
    if (field) {
      field.nativeElement.focus();
    }
  }

  isEditing = false;
  isSaving = false;
  todoTitle = '';

  editTodo() {
    this.isEditing = true;
    this.todoTitle = this.todo.title;
  }

  saveTodo() {
    if (!this.isEditing) {
      return;
    }

    this.isEditing = false;
    this.renameTodo.emit(this.todoTitle);
  }
}
