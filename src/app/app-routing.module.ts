import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksListComponent} from "./components/tasks-list/tasks-list.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TasksListComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
