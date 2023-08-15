import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';

const routes: Routes = [
  { path: 'todos/:status', component: TodoPageComponent },
  { path: '**', redirectTo: '/todos/all', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoPageComponent,
    TodoComponent,
    TodoFormComponent,
    MessageComponent,
    TodoFilterComponent,
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(routes)],
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
