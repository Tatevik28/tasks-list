import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {addTask, deleteTask, updateTask} from "../../state/task.actions";
import * as _ from 'lodash';
import {Task} from "../../interfaces/task.interface";
import {getTasks} from "../../state/task.selector";

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.component.html',
    styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnDestroy {
    modalTextName: string = '';
    tasksData: Task[] = [];
    tasks$: Observable<Task[]> = new Observable();
    tasksSubscription: Subscription;
    addItem: string = '';
    deleteId: string = '';
    nameOrder: string = 'asc';
    statusOrder: string = 'desc';
    openPopup: boolean = false;

    constructor(private store: Store<{ tasks: {tasks: Task[] } }>) {
        this.tasksSubscription = this.store.select('tasks').subscribe((data) => {
            this.tasksData = data.tasks;
        })

        this.tasks$ = this.store.select(getTasks);

    }

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        console.log(event);
    }

    ngOnDestroy() {
        if(this.tasksSubscription) {
            this.tasksSubscription.unsubscribe();
        }
    }

    openModal(data: any): void {
        this.deleteId = data.id;
        this.modalTextName = data.name;
    }

    closeModal(): void {
        this.modalTextName = '';
    }

    closePopup(): void {
        this.openPopup = false;
    }

    edit(data: any): void {

        const task: Task = {
            id: data.id,
            name: data.name,
            description: data.description,
            creation_date: data.creation_date,
            status: 'done'
        }

        this.store.dispatch(updateTask({ task }));
    }

    addTask(): void {
        if (this.checkIfExists(this.addItem) > -1) {
            return
        }

        this.openPopup = true;
    }

    onDelete(): void {
        const id = this.deleteId;
        this.store.dispatch(deleteTask({ id }));
        this.deleteId = '';
    }

    checkIfExists(name: string): number {
        return this.tasksData.findIndex(item => item.name === name);
    }

    changeValue(event: any): void {
        this.addItem = event.target.value;
    }

    createTask(event: any): void {
        const task: Task = {
            id: '',
            name: event.name,
            description: event.description,
            status: 'to do',
            creation_date: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`
        }

        this.store.dispatch(addTask({ task }));
    }

    sortByName(): void {
        if (this.nameOrder === 'asc') {
            this.tasksData = _.orderBy(this.tasksData, 'name', 'asc');
            this.nameOrder = 'desc';
        } else if (this.nameOrder === 'desc') {
            this.tasksData = _.orderBy(this.tasksData, 'name', 'desc');
            this.nameOrder = '';
        } else {
            this.tasksData = _.orderBy(this.tasksData, 'name', false);
            this.nameOrder = 'asc';
        }
    }

    sortByStatus():void {
        if (this.statusOrder === 'asc') {
            this.tasksData = _.orderBy(this.tasksData, 'status', 'asc');
            this.statusOrder = 'desc';
        } else if (this.statusOrder === 'desc') {
            this.tasksData = _.orderBy(this.tasksData, 'status', 'desc');
            this.statusOrder = '';
        } else {
            this.tasksData = _.orderBy(this.tasksData, 'status', false);
            this.statusOrder = 'asc';
        }
    }
}
