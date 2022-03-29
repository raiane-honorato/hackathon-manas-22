import { useEffect } from "react";
import { useState } from "react";
import Services from "../../services";
import { ToDoItemTutorialWrap, ToDoItemWrap } from "./styles";
import { CleanButton } from "../../styles/button";
import { getAvatar } from "./../../assets/getAvatar";
import { Avatar, AvatarGroup, Checkbox, FormControlLabel } from "@mui/material";
import Tutorial from "../../components/tutorial";

function ToDoItem({task, listId}) {
    const [users, setUsers] = useState([]);
    const [done, setDone] = useState(task.status);
    const [type, setType] = useState({});
    const [tutorialOpen, setTutorialOpen] = useState(false);

    useEffect(() => {
      const promises = task.responsable_list.map(async (userId) => {
        return await Services.getUserById(listId, userId);
      });
      Promise.all(promises).then(res => setUsers(res));

      Services.getTaskTypeById(task.type_id).then(res => setType(res));
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

    // console.log(type)

    return(
      <ToDoItemTutorialWrap>
        <ToDoItemWrap>
          <div className="avatar-name-wrapp">
            <div className="avatar-wrapp">
              <AvatarGroup max={2}>
                {users && users.map(user => (
                  <Avatar alt={user.name} src={getAvatar(user.avatar)} sx={{ width: 24, height: 24 }}/>
                ))}
              </AvatarGroup>
            </div>
            <label className="checkbox-container">{task.name}
              <input type="checkbox" checked={done} onClick={() => setDone(!done)} ></input>
              <span class="checkmark"></span>
            </label>
          </div>
          
          {type.tutorial &&
            <CleanButton className="doubt-btn" onClick={() => setTutorialOpen(!tutorialOpen)}>?</CleanButton>
          }


        </ToDoItemWrap>
        {tutorialOpen &&
          <Tutorial tutorialLink={type.tutorial} onClose={() => setTutorialOpen(!tutorialOpen)}/>
        }
      </ToDoItemTutorialWrap>
    )
}

export default ToDoItem;