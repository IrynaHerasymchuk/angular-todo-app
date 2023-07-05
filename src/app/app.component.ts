import { Component, OnInit } from '@angular/core';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [
    { id: 1, title: 'HTML + CSS', completed: true },
    { id: 2, title: 'JS', completed: false },
    { id: 3, title: 'React', completed: false },
    { id: 4, title: 'Angular', completed: false },
  ];
  isEditing = false;
  isSaving = false;
  activeTodos: Todo[] = [];
  todoTitle = '';

  ngOnInit() {
    this.countActiveTodos();
  }

  countActiveTodos() {
    this.activeTodos = this.todos.filter(todo => !todo.completed);
  }

  addTodo() {
    if (!this.todoTitle) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.todoTitle,
      completed: false,
    }

    this.todos.push(newTodo);
    this.todoTitle = '';
    this.countActiveTodos();
  }
}
