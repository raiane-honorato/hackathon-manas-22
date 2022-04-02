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
import SnackbarComp from "../../components/Snackbar";

function List() {
  const {listId} = useParams();
  const [list, setList] = useState({});
  const [tasks, setTasks] = useState([]);

  const [snackState, setSnackState] = useState({
    open: false,
    type: "success",
    duration: 1000,
    message: dictionary['abel_success_change_name'],
    handleClose: (() => setSnackState({...snackState, open: false}))
  });

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

  useEffect(() => {
    console.log(list)
  }, [list])

  const handleListUpdate = () => {
    Services.updateList(listId, list.name, list.reward).then(res => {
      if(res.status === 204) {
        setSnackState({...snackState, open: true, type: "success", message: dictionary['label_success_change_name']})
      } else {
        setSnackState(
          {...snackState, 
            open: false, 
            type: "error", 
            message: dictionary['label_error'], 
            handleClose: (() => {
              setSnackState({...snackState, open: false});
              window.location.reload();
            })
          })
        }
    })}

  return(
    <ListWrapper>
      <SnackbarComp
        open={snackState.open} 
        type={snackState.type} 
        duration={snackState.duration} 
        message={snackState.message} 
        handleClose={snackState.handleClose} 
      />

      <Navbar>
        <h1><NavLink to ="/"><img src={logoPurple} alt={dictionary['alt_logo']}/></NavLink></h1>
      </Navbar>

      <ListName>
        <img src={logoList} />
        <input 
          placeholder={dictionary['label_list_name_placeholder']}
          value={list.name}
          onChange={event => setList({...list, name: event.target.value})}
          onBlur={handleListUpdate}
        ></input>
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