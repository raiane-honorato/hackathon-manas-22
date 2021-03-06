import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import List from "./pages/list";
import Task from "./pages/task";
import Settings from "./pages/settings";
import Person from "./pages/person";

function MyRoutes() {

    return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element = {<Home />} exact/>
            <Route path='/list/:listId' element = {<List />}/>
            <Route path='/list/:listId/settings' element = {<Settings />}/>
            <Route path='/list/:listId/task' element = {<Task />}/>
            <Route path='/list/:listId/task/:taskId' element = {<Task />}/>
            <Route path='/list/:listId/person' element = {<Person />}/>
            <Route path='/list/:listId/person/:personId' element = {<Person />}/>
        </Routes>
    </BrowserRouter>
    )
}

export default MyRoutes;