import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, switchMap, tap, withLatestFrom } from 'rxjs';
import { Todo } from '../types/todo';

const USER_ID = '10903';
const API_URL = 'https://mate.academy/students-api';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos$$ = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos$$.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  loadTodos() {
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`)
      .pipe(
        tap((todos) => this.todos$$.next(todos))
      );
  }

  createTodo(title: string) {
    return this.http.post<Todo>(`${API_URL}/todos`, {
      userId: USER_ID,
      title,
      completed: false
    })
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([createdTodo, todos]) => {
          this.todos$$.next([ ...todos, createdTodo ])
        })
      )
  }

  updateTodo(todo: Todo) {
    return this.http.patch<Todo>(`${API_URL}/todos/${todo.id}`, todo)
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([updatedTodo, todos]) => {
          this.todos$$.next(
            todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
          )
        })
      )
  }

  deleteTodo(todoId: number) {
    return this.http.delete<Todo>(`${API_URL}/todos/${todoId}`)
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([, todos]) => {
          this.todos$$.next(
            todos.filter(todo => todo.id !== todoId)
          )
        })
      )
  }

  deleteCompletedTodos() {
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`).pipe(
      switchMap(todos =>
        forkJoin(
          todos
            .filter(todo => todo.completed)
            .map(todo => this.http.delete(`${API_URL}/todos/${todo.id}?userId=${USER_ID}`))
        ).pipe(
          tap(() => {
            this.todos$$.next(
              todos.filter(todo => !todo.completed)
            );
          })
        )
      )
    );
  }
}
