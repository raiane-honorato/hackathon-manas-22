import { useState, useEffect } from "react";
import { useParams } from "react-router";

function List() {
    const parameter = useParams();
    console.log(parameter);
    return(
        <>
        <p>Hello</p>
        </>
    )
}

export default List;