import { atom } from 'recoil';

export const registeredUser = atom({
    key: 'registeredUser',
    default: "",
});

export const selectedStatus = atom({
    key: 'selectedStatus',
    default: "InProgressTasks",
});


export const editTasks = atom({
    key: 'editTasks',
    default: null,
});

export const showStatusModal = atom({
    key: 'showStatusModal',
    default: false,
});

export const taskItemsState = atom({
    key: 'taskItemsState',
    default: "",
});