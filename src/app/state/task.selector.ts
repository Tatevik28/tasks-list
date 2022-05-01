import {createFeatureSelector, createSelector} from "@ngrx/store";
import {Task} from "../interfaces/task.interface";

const getTasksState = createFeatureSelector<{tasks:Task[]}>('hobbies');

export const getTasks = createSelector(getTasksState, state => {
    return state.tasks;
})
