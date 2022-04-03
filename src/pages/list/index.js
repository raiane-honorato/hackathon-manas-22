import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import Services from "../../services";
import { ListName, ListWrapper, Navbar, ToDoWrapper } from "./styles";
import logoPurple from "./../../assets/logo_purple.svg";
import logoSettings from "./../../assets/settings_icon.svg";
import logoList from "./../../assets/logo_list.svg";
import { dictionary } from "../../utils/translate";
import ToDoItem from "./toDoItem";
import { PurpleButton, TransButton } from "../../styles/button";
import SnackbarComp from "../../components/Snackbar";
import Loading from "../../components/Loading";
import { handleRenewTask } from "../../utils/handleRenewTask";

function List() {
  const {listId} = useParams();
  const [list, setList] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateList, setUpdateList] = useState(false);

  const [snackState, setSnackState] = useState({
    open: false,
    type: "success",
    duration: 1000,
    message: '',
    handleClose: (() => setSnackState({...snackState, open: false}))
  });



  useEffect(async () => {
    setIsLoading(true);
    const res1 = await Services.getListById(listId);
    setList(res1.data);

    const res2 = await Services.getTasksList(listId);
    setTasks(res2.data);
    if(res2.data) {
      const renewResponse = await handleRenewTask(listId, res2.data);
      if(renewResponse === 204) {
        const res2 = await Services.getTasksList(listId);
        setTasks(res2.data);
      }
    }
    setIsLoading(false);
    setUpdateList(false);
      
    
  }, [updateList]);

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
        <div>
          <img src={logoList} className="list-icon" />
          <input 
            placeholder={dictionary['label_list_name_placeholder']}
            value={list.name}
            onChange={event => setList({...list, name: event.target.value})}
            onBlur={handleListUpdate}
          ></input>
        </div>
        <NavLink to="settings"><img src={logoSettings} className="set=icon"/></NavLink>
      </ListName>

      <ToDoWrapper>
        {
          tasks &&
          tasks.map((task) => (<ToDoItem task={task} key={`task-item-${task.id}`} listId = {listId} setUpdateList={setUpdateList} snackState = {snackState} setSnackState={setSnackState}/>))
        }
      </ToDoWrapper>

      <PurpleButton className="add-btn">
        <NavLink to={`task`}>
          {dictionary['label_add_task']}
        </NavLink>
      </PurpleButton>
      <TransButton className="person-btn">
        <NavLink to={`settings?people=true`}>
          {dictionary['label_see_people']}
        </NavLink>
      </TransButton>

      <Loading open={isLoading}/>
    </ListWrapper>
  )
}

export default List;