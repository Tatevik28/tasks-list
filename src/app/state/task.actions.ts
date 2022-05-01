import {createAction, props} from "@ngrx/store";
import {Task} from "../interfaces/task.interface";

export const ADD_TASK_ACTION = '[tasks page] add task';
export const UPDATE_TASK_ACTION = '[tasks page] update task';
export const DELETE_TASK_ACTION = '[tasks page] delete task';

export const addTask = createAction(ADD_TASK_ACTION, props<{ task: Task }>());
export const updateTask = createAction(UPDATE_TASK_ACTION, props<{ task: Task }>());
export const deleteTask = createAction(DELETE_TASK_ACTION, props<{ id: string }>());


