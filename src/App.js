import { useState, useEffect } from "react";
import './App.css';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import List from "./pages/list";

function App() {
  const [newName, setNewName] = useState("");
  const [newLogin, setNewLogin] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {name: newName, login: newLogin});
  };

  const updateUser = async (id, login) => {
    const userDoc = doc(db, "users", id);
    const newFields = {login: `${login}${Math.floor(Math.random() * 100)}`};
    await updateDoc(userDoc, newFields); 
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    }

    getUsers();
  }, []);

  return (
  //   <div className="App">
  //     {users.map((user) => {
  //       return (
  //         <div key={user.login}>
  //           <p>{user.name}</p>
  //           <p>{user.login}</p>
  //           <button onClick = {() => updateUser(user.id, user.login)}>Random login</button>
  //           <button onClick = { () => {deleteUser(user.id)}}>Delete user</button>
  //         </div>
  //       )
  //     })}
  //     <input placeholder="name" onChange={(event) => setNewName(event.target.value)}></input>
  //     <input placeholder="login" onChange={(event) => setNewLogin(event.target.value)}></input>
  //     <button onClick = { createUser }>Create user</button>
  //   </div>
  <List />
  );
};

export default App;
