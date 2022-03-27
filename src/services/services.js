import { useState, useEffect } from "react";

import { db } from '../firebase-config';

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    getDoc
} from 'firebase/firestore';


const getListById = async (listId) => {
    const listCollectionRef = collection(db, "list");
    const listRef = doc(db, "list", listId);
    const listSnap = await getDoc(listRef);
    if (listSnap.exists()) {
        const list = {
            ...listSnap.data(),
            id: listSnap.id
        }
        return (list);
    } else {
        return null;
    }
};

const getUsersList = async (listId) => {
    const usersCollectionRef = collection(db, `/list/${listId}/users`);
    const userSnap = await getDocs(usersCollectionRef);
    if (!userSnap.empty) {
        const users = userSnap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        return (users);
    } else {
        return null;
    }
};

const getTasksList = async (listId) => {
    const taskListCollectionRef = collection(db, `/list/${listId}/task_list`);
    const taskListSnap = await getDocs(taskListCollectionRef);
    if (!taskListSnap.empty) {
        const taskList = taskListSnap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            responsable_list: doc.data().responsable_list.map(doc => (doc.id)),
            type_id: doc.data().type_id.id
        }));
        return (taskList);
    } else {
        return null;
    }
};

const getUserById = async (listId, userId) => {
    const userRef = doc(db, `/list/${listId}/users`, userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        const users = {
            ...userSnap.data(),
            id: userSnap.id
        };
        return (users);
    } else {
        return null;
    }
};

const getTaskById = async (listId, taskId) => {
    const taskRef = doc(db, `/list/${listId}/task_list`, taskId);
    const taskSnap = await getDoc(taskRef);
    if (taskSnap.exists()) {
        const task = {
            ...taskSnap.data(),
            id: taskSnap.id,
            responsable_list: taskSnap.data().responsable_list.map(doc => (doc.id)),
            type_id: taskSnap.data().type_id.id
        };
        return (task);
    } else {
        return null;
    }
};

const getTaskTypeById = async (taskTypeId) => {
    const taskType = doc(db, "task", taskTypeId);
    const taskSnap = await getDoc(taskType);
    if (taskSnap.exists()) {
        const taskType = {
            ...taskSnap.data(),
            id: taskSnap.id
        }
        return (taskType);
    } else {
        return null;
    }
}

// getTaskById("8eJTab00sKWT4KBFOB8W", "L11xwRQmZ2KA8CZTV3IP").then(res => console.log("task id", res));
// getListById("8eJTab00sKWT4KBFOB8W").then(res => console.log("list", res));
// getUsersList("8eJTab00sKWT4KBFOB8W").then(res => console.log("users", res));
// getTasksList("8eJTab00sKWT4KBFOB8W").then(res => console.log("task_list", res));
// getUserById("8eJTab00sKWT4KBFOB8W", "gaqfAxv1Hdrbas20ANPc").then(res => console.log("user_list", res));
// getTaskTypeById("maAAlJ7ZECv2GcwSAWzu").then(res => console.log("task_type", res));



const createList = async (name, reward) => {
    const listRef = collection(db, "list");
    try {
        const newList = await addDoc(listRef, {
            name,
            reward
        });
        return newList.id;
    } catch (e) {
        return e;
    }
};

const addUserToList = async (listId, avatar, name, stars) => {
    const usersCollectionRef = collection(db, `/list/${listId}/users`);
    try {
        const newUser = await addDoc(usersCollectionRef, {
            avatar,
            name,
            stars
        });
        return newUser.id;
    } catch (e) {
        return e;
    }
};

const addTaskToList = async (listId, name, renew_time, status, type_id, userList) => {
    const taskListCollectionRef = collection(db, `/list/${listId}/task_list`);
    const taskTypeRef = doc(db, "task", type_id);
    const responsableList = userList.map(userId => doc(db, `/list/${listId}/users`, userId));
    try {
        const newTask = await addDoc(taskListCollectionRef, {
            name,
            renew_time,
            status,
            type_id: taskTypeRef,
            responsable_list: responsableList
        });
        return newTask.id;
    } catch (e) {
        return e;
    }
};

// const addResponsableToTask = async ()

// addTaskToList("PeUkWfU2jxwEypw05HmF", "lista teste", 4, false, "maAAlJ7ZECv2GcwSAWzu", ['gaqfAxv1Hdrbas20ANPc'])

// createList("lista teste", "recompensa").then(res => console.log(res))

const updateList = async (listId, name, reward) => {
    const listDoc = doc(db, "list", listId);
    const newFields = {
        name,
        reward
    };
    try {
        await updateDoc(listDoc, newFields);
        return true;
    } catch (e) {
        return e;
    }
};

const updateUser = async (listId, userId, avatar, name, stars) => {
    const userRef = doc(db, `/list/${listId}/users`, userId);
    const newFields = {
        avatar,
        name,
        stars
    };
    try {
        await updateDoc(userRef, newFields);
        return true;
    } catch (e) {
        return e;
    }
};

const updateTask = async (listId, taskId, name, renew_time, status, type_id, userList) => {
    const taskRef = doc(db, `/list/${listId}/task_list`, taskId);
    const taskTypeRef = doc(db, "task", type_id);
    const responsableList = userList.map(userId => doc(db, `/list/${listId}/users`, userId));
    const newFields = {
        name,
        renew_time,
        status,
        type_id: taskTypeRef,
        responsable_list: responsableList
    };
    try {
        await updateDoc(taskRef, newFields);
        return true;
    } catch (e) {
        return e;
    }
};

// updateList("8eJTab00sKWT4KBFOB8W", "lista mara", "recompensa atualizada 2").then(res => console.log(res))
// updateUser("PeUkWfU2jxwEypw05HmF","G9oiQCc8M8KuFjqBMPzh",1,"user updated",3);
// updateTask("8eJTab00sKWT4KBFOB8W", "L11xwRQmZ2KA8CZTV3IP", "tarefa atualizada", 7, false, 'Fu5GNMl7vdYk6Ccx8RMY', ['4SMqd7arqn4Px4ARHU6B','gaqfAxv1Hdrbas20ANPc'])

const deleteList = async (listId) => {
    const listDoc = doc(db, "list", listId);
    try {
        await deleteDoc(listDoc);
        return true;
    } catch (e) {
        return e;
    }
};

const deleteUser = async (listId, userId) => {
    const userRef = doc(db, `/list/${listId}/users`, userId);
    try {
        await deleteDoc(userRef);
        return true;
    } catch (e) {
        return e;
    }
};

const deleteTask = async (listId, taskId) => {
    const taskRef = doc(db, `/list/${listId}/task_list`, taskId);
    try {
        await deleteDoc(taskRef);
        return true;
    } catch (e) {
        return e;
    }
};

export default {
    getListById,
    getUsersList,
    getTasksList,
    getUserById,
    getTaskById,
    getTaskTypeById,
    createList,
    addUserToList,
    addTaskToList,
    updateList,
    updateUser,
    updateTask,
    deleteList,
    deleteUser,
    deleteTask
}