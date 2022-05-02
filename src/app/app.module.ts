import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ConfirmationModalComponent} from './components/confirmation-modal/confirmation-modal.component';
import {StoreModule} from "@ngrx/store";
import {tasksReducer} from "./state/task.reducer";
import {TasksListComponent} from "./components/tasks-list/tasks-list.component";
import {TaskFormPopupComponent} from './components/task-form-popup/task-form-popup.component';
import { LoginComponent } from './components/login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        ConfirmationModalComponent,
        TasksListComponent,
        TaskFormPopupComponent,
        LoginComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({tasks: tasksReducer}),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
