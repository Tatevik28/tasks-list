import {Action, createReducer, on} from "@ngrx/store";
import {addTask, deleteTask, updateTask} from "./task.actions";
import {initialState} from "./task.state";

const _tasksReducer = createReducer(
    initialState,
    on(addTask, (state, action) => {
        let task = {...action.task};

        task.id = (state.tasks.length + 1).toString();
        window.localStorage.setItem('tasks', JSON.stringify([...state.tasks, task]))
        return {
            ...state,
            tasks: [...state.tasks, task]
        }
    }),
    on(updateTask, (state, action) => {
       const updatedTasks = state.tasks.map(task => {
           return task.id === action.task.id ? action.task : task;
       })
        window.localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        return {
           ...state,
            tasks: updatedTasks
        }
    }),
    on(deleteTask, (state, {id}) => {
        const updatedTasks = state.tasks.filter(task => {
            return task.id !== id;
        })
        window.localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        return {
            ...state,
            tasks: updatedTasks
        }
    })
)

export function tasksReducer(state: any, action: Action) {
    return _tasksReducer(state, action);
}
