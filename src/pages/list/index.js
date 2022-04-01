import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Services from "../../services";
import { ListName, ListWrapper, Navbar, ToDoWrapper } from "./styles";
import logoPurple from "./../../assets/logo_purple.svg";
import logoReward from "./../../assets/reward.svg";
import logoTeam from "./../../assets/team.svg";
import logoList from "./../../assets/logo_list.svg";
import { dictionary } from "../../assets/translate";
import ToDoItem from "./toDoItem";
import { GreenButton, PurpleButton } from "../../styles/button";

function List() {
  const {listId} = useParams();
  const [list, setList] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    Services.getListById(listId).then(
      res => setList(res.data)
    )
  }, []);

  useEffect(() => {
    Services.getTasksList(listId).then(
      res => setTasks(res.data)
    )
  }, [listId]);

  return(
    <ListWrapper>
      <Navbar>
        <h1><NavLink to ="/"><img src={logoPurple} alt={dictionary['alt_logo']}/></NavLink></h1>
        <div>
          <NavLink to="/"><img src={logoReward} /></NavLink>
          <NavLink to="/"><img src={logoTeam} /></NavLink>
        </div>
      </Navbar>

      <ListName>
        <img src={logoList} />
        <span>{list && list.name}</span>
      </ListName>

      <ToDoWrapper>
        {
          tasks &&
          tasks.map((task) => (<ToDoItem task={task} listId = {listId}/>))
        }
      </ToDoWrapper>

      <PurpleButton className="add-btn">
        <NavLink to={`task`}>
          {dictionary['label_add_task']}
        </NavLink>
      </PurpleButton>
    </ListWrapper>
  )
}

export default List;