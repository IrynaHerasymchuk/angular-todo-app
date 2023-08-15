import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { TodoService } from 'src/app/services/todo.service';
import { Status } from 'src/app/types/status';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
  todos$ = this.todoService.todos$;
  activeTodos$ = this.todos$.pipe(
    distinctUntilChanged(),
    map(todos => todos.filter(todo => !todo.completed))
  );
  activeCount$ = this.activeTodos$.pipe(
    map(todos => todos.length)
  );
  completedTodos$ = this.todos$.pipe(
    map(todos => todos.filter(todo => todo.completed))
  );
  visibleTodos$ = this.route.params.pipe(
    switchMap(params => {
      switch (params['status'] as Status) {
        case 'active':
          return this.activeTodos$;

        case 'completed':
          return this.completedTodos$;
      
        default:
          return this.todos$;
      }
    })
  )
  loading = true;

  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.todoService.loadTodos().pipe(
      tap(todos => {
        if (todos) {
          this.loading = false;
        }
      })
    ).subscribe({
        error: () => this.messageService.showMessage('Unable to load todos'),
      });
  }

  addTodo(newTodoTitle: string) {
    this.todoService.createTodo(newTodoTitle)
      .subscribe({
        error: () => this.messageService.showMessage('Unable to add a todo'),
      });
  }

  renameTodo(todo: Todo, newTodoTitle: string) {
    this.todoService.updateTodo({ ...todo, title: newTodoTitle })
      .subscribe({
        error: () => this.messageService.showMessage('Unable to rename a todo'),
      });
  }

  toggleTodo(todo: Todo) {
    this.todoService.updateTodo({ ...todo, completed: !todo.completed })
      .subscribe({
        error: () => this.messageService.showMessage('Unable to toggle a todo'),
      });
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId)
      .subscribe({
        error: () => this.messageService.showMessage('Unable to delete a todo'),
      });
  }

  clearCompletedTodos() {
    this.todoService.deleteCompletedTodos()
      .subscribe({
        error: () => this.messageService.showMessage('Unable to clear todos'),
      });
  }

  trackById(index: number, todo: Todo) {
    return todo.id;
  }
}
