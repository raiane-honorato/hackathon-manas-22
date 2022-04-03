import { useEffect } from "react";
import { useState } from "react";
import Services from "../../services";
import { ToDoItemTutorialWrap, ToDoItemWrap } from "./styles";
import { CleanButton } from "../../styles/button";
import { getAvatar } from "./../../assets/getAvatar";
import { Avatar, AvatarGroup, Checkbox, FormControlLabel } from "@mui/material";
import Tutorial from "../../components/tutorial";
import { PurpleCheckbox } from "../../styles/checkbox";
import { formatDate } from "../../assets/formatDate";
import { useNavigate } from "react-router-dom";

function ToDoItem({task, listId}) {
    const [users, setUsers] = useState([]);
    const [done, setDone] = useState(task.status);
    const [type, setType] = useState({});
    const [tutorialOpen, setTutorialOpen] = useState(false);

    let navigate = useNavigate();
    let createdDate = new Date(task.created_at);

    useEffect(() => {
      const promises = task.responsable_list.map(async (userId) => {
        return await Services.getUserById(listId, userId);
      });
      Promise.all(promises).then(values => setUsers(values.map(value => value.data))
      
        );

      Services.getTaskTypeById(task.type_id).then(res => setType(res.data));
    },[])

    useEffect(() => {
      Services.updateTask(
        listId, 
        task.id, 
        task.name, 
        task.renew_time, 
        done, 
        task.type_id, 
        task.responsable_list, 
        task.created_at)
    },[done])

    return(
      <ToDoItemTutorialWrap done={done}>
        <ToDoItemWrap done={done} onClick={() => {navigate(`/list/${listId}/task/${task.id}`)}}>
          <div className="avatar-name-wrapp">
            <span>{task.name}</span>
            <div className="avatar-wrapp">
              <AvatarGroup max={2}>
                {users && users.map(user => (
                  <Avatar alt={user?.name} src={getAvatar(user?.avatar)} sx={{ width: 30, height: 30 }}/>
                ))}
              </AvatarGroup>
            </div>
          </div>

          <Checkbox 
            checked={done}
            onChange={() => setDone(!done)}
            onClick={(event) => {event.stopPropagation()}}
            color="default"
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28, backgroundColor: 'white'} }}
            className="task-checkbox"
          />

          <span>{formatDate(createdDate)}</span>
          
          {type.tutorial &&
            <CleanButton 
            className="doubt-btn" 
            onClick={(event) => {
              event.stopPropagation();
              setTutorialOpen(!tutorialOpen);
            }}
            >?</CleanButton>
          }


        </ToDoItemWrap>
        {tutorialOpen &&
          <Tutorial tutorialLink={type.tutorial} onClose={() => setTutorialOpen(!tutorialOpen)}/>
        }
      </ToDoItemTutorialWrap>
    )
}

export default ToDoItem;