import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import List from "./pages/list";
import Task from "./pages/task";
import Team from "./pages/team";

function MyRoutes() {

    return(
    <BrowserRouter>
        <Routes>
            <Route path='/' element = {<Home />} exact/>
            <Route path='/list/:listId' element = {<List />}/>
            <Route path='/list/:listId/team' element = {<Team />}/>
            <Route path='/list/:listId/task' element = {<Task />}/>
            <Route path='/list/:listId/task/:taskId' element = {<Task />}/>
        </Routes>
    </BrowserRouter>
    )
}

export default MyRoutes;