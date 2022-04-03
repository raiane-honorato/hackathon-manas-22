import { db } from '../firebase-config';

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    getDoc,
    query,
    where,
    orderBy
} from 'firebase/firestore';

const getListById = async (listId) => {
    const listRef = doc(db, "list", listId);
    const listSnap = await getDoc(listRef);
    if (listSnap.exists()) {
        const list = {
            ...listSnap.data(),
            id: listSnap.id
        }
        return ({status: 200, data: list});
    } else {
        return ({status: 404});
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
        return ({status: 200, data: users});
    } else {
        return ({status: 404});
    }
};

const getTasksList = async (listId) => {
    const taskListCollectionRef = collection(db, `/list/${listId}/task_list`);
    const q = query(taskListCollectionRef, orderBy("status"));
    const taskListSnap = await getDocs(q);
    if (!taskListSnap.empty) {
        const taskList = taskListSnap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            responsable_list: doc.data().responsable_list.map(doc => (doc.id)),
            type_id: doc.data().type_id.id
        }));
        return ({status: 200, data: taskList});
    } else {
        return ({status: 404});
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
        return ({status: 200, data: users});
    } else {
        return ({status: 404});
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
        return ({status: 200, data: task});
    } else {
        return ({status: 404});
    }
};

const getTaskTypeList = async (type="") => {
    let taskTypeCollection = collection(db, `/task`);
    if(type) {
        taskTypeCollection = query(taskTypeCollection, where("type", "==", type))
    }
    const taskTypeSnap = await getDocs(taskTypeCollection);
    if (!taskTypeSnap.empty) {
        const taskTypes = taskTypeSnap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }));
        return ({status: 200, data: taskTypes});
    } else {
        return ({status: 404});
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
        return ({status: 200, data: taskType});
    } else {
        return ({status: 404});
    }
};

const createList = async (name, reward) => {
    const listRef = collection(db, "list");
    try {
        const newList = await addDoc(listRef, {
            name,
            reward
        });
        return {status: 201, data: newList.id};
    } catch (e) {
        return {status: 400, error: e};
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
        return ({status: 201, data: newUser.id});
    } catch (e) {
        return ({status: 400, error: e});
    }
};

const addTaskToList = async (listId, name, renew_time, status, type_id, userList, created_at) => {
    const taskListCollectionRef = collection(db, `/list/${listId}/task_list`);
    const taskTypeRef = doc(db, "task", type_id);
    const responsableList = userList.map(userId => doc(db, `/list/${listId}/users`, userId));
    try {
        const newTask = await addDoc(taskListCollectionRef, {
            name,
            renew_time,
            status,
            created_at: Date.now(),
            last_renewed_date: Date.now(),
            type_id: taskTypeRef,
            responsable_list: responsableList
        });
        return ({status: 201, data: newTask.id});
    } catch (e) {
        return ({status: 400, error: e});
    }
};

const updateList = async (listId, name, reward) => {
    const listDoc = doc(db, "list", listId);
    const newFields = {
        name,
        reward
    };
    try {
        await updateDoc(listDoc, newFields);
        return ({status: 204});
    } catch (e) {
        return ({status: 400, error: e});
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
        return ({status: 204});
    } catch (e) {
        return ({status: 400, error: e});
    }
};

const updateTask = async (listId, taskId, name, renew_time, status, type_id, userList, created_at, last_renewed_date) => {
    const taskRef = doc(db, `/list/${listId}/task_list`, taskId);
    const taskTypeRef = doc(db, "task", type_id);
    const responsableList = userList.map(userId => doc(db, `/list/${listId}/users`, userId));
    const newFields = {
        name,
        renew_time,
        status,
        created_at,
        last_renewed_date,
        type_id: taskTypeRef,
        responsable_list: responsableList
    };
    try {
        await updateDoc(taskRef, newFields);
        return ({status: 204});
    } catch (e) {
        return ({status: 400, error: e});
    }
};

const deleteList = async (listId) => {
    const listDoc = doc(db, "list", listId);
    try {
        await deleteDoc(listDoc);
        return ({status: 204});
    } catch (e) {
        return ({status: 400, error: e});
    }
};

const deleteUser = async (listId, userId) => {
    const userRef = doc(db, `/list/${listId}/users`, userId);
    try {
        await deleteDoc(userRef);
        return ({status: 204});
    } catch (e) {
        return ({status: 400, error: e});
    }
};

const deleteTask = async (listId, taskId) => {
    const taskRef = doc(db, `/list/${listId}/task_list`, taskId);
    try {
        await deleteDoc(taskRef);
        return ({status: 204});
    } catch (e) {
        return ({status: 400, error: e});
    }
};

export default {
    getListById,
    getUsersList,
    getTasksList,
    getUserById,
    getTaskById,
    getTaskTypeList,
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
};