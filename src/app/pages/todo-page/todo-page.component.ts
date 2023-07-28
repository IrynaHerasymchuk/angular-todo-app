import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageService } from 'src/app/services/message.service';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/types/todo';

@UntilDestroy()
@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];

  get todos() {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos === this._todos) {
      return;
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter(todo => !todo.completed);
  }

  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.todoService.todos$
      .pipe(untilDestroyed(this))
      .subscribe((todos) => {
        this.todos = todos;
      });

    this.todoService.loadTodos()
      .pipe(untilDestroyed(this))
      .subscribe({
        error: () => this.messageService.showMessage('Unable to load todos'),
      });
  }

  addTodo(newTodoTitle: string) {
    this.todoService.createTodo(newTodoTitle)
      .pipe(untilDestroyed(this))
      .subscribe({
        error: () => this.messageService.showMessage('Unable to add a todo'),
      });
  }

  renameTodo(todo: Todo, newTodoTitle: string) {
    this.todoService.updateTodo({ ...todo, title: newTodoTitle })
      .pipe(untilDestroyed(this))
      .subscribe({
        error: () => this.messageService.showMessage('Unable to rename a todo'),
      });
  }

  toggleTodo(todo: Todo) {
    this.todoService.updateTodo({ ...todo, completed: !todo.completed })
      .pipe(untilDestroyed(this))
      .subscribe({
        error: () => this.messageService.showMessage('Unable to toggle a todo'),
      });
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId)
      .pipe(untilDestroyed(this))
      .subscribe({
        error: () => this.messageService.showMessage('Unable to delete a todo'),
      });
  }

  trackById(index: number, todo: Todo) {
    return todo.id;
  }
}
