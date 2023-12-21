import { atom } from 'recoil';

export const registeredUser = atom({
    key: 'registeredUser',
    default: "",
});

export const selectedstatus = atom({
    key: 'selectedstatus',
    default: "IN_PROGRESS",
});


export const editTasks = atom({
    key: 'editTasks',
    default: null,
});

export const showStatusModal = atom({
    key: 'showStatusModal',
    default: false,
});

export const addTasksRecoil = atom({
    key: 'addTasksRecoil',
    default: "",
});

export const userSpecificTasks = atom({
    key: 'userSpecificTasks',
    default: [],
});

export const hoursState = atom({
    key: 'hoursState',
    default: 0,
});