export const initialState = {
    tasks: [
        {
            name: 'New Task',
            description: 'Urgent',
            status: 'to do',
            creation_date: `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
            id: '1'
        }
    ]
}

if (window.localStorage.getItem('tasks')) {
    initialState.tasks = JSON.parse(<string>window.localStorage.getItem('tasks'));
}
