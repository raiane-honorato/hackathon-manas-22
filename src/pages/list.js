import { useState, useEffect } from "react";
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';

function List() {

    return(
        <>
        <p>Hello</p>
        </>
    )
}

export default List;