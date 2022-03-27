import { useEffect } from "react";
import { useState } from "react";
import Services from "../../services";
import { ToDoItemWrap } from "./styles";
import avatar1 from "./../../assets/avatar_1.png";
import avatar2 from "./../../assets/avatar_2.png";
import avatar3 from "./../../assets/avatar_3.png";
import avatar4 from "./../../assets/avatar_4.png";
import avatar5 from "./../../assets/avatar_5.png";
import avatar6 from "./../../assets/avatar_6.png";
import { CleanButton } from "../../styles/button";

function ToDoItem({task, listId}) {
    const [users, setUsers] = useState([]);
    const [done, setDone] = useState(task.status);
    const [type, setType] = useState({});

    const getAvatar = (avId) => {
      switch (avId){
        case 1: return(avatar1);
        case 2: return(avatar2);
        case 3: return(avatar3);
        case 4: return(avatar4);
        case 5: return(avatar5);
        case 6: return(avatar6);
      }
    }

    useEffect(() => {
      const promises = task.responsable_list.map(async (userId) => {
        return await Services.getUserById(listId, userId);
      });
      Promise.all(promises).then(res => setUsers(res));

      Services.getTaskTypeById(task.type_id).then(res => setType(res));
    },[])

    useEffect(() => {
      Services.updateTask(listId, task.id, task.name, task.renew_time, done, task.type_id, task.responsable_list)
    },[done])

    console.log(task)

    return(
        <ToDoItemWrap>
          <div className="avatar-wrapp">
            {users && users.map(user => (
              <img src={getAvatar(user.avatar)}/>
            ))}
          </div>
          <label className="checkbox-container">{task.name}
            <input type="checkbox" checked={done} onClick={() => setDone(!done)} ></input>
            <span class="checkmark"></span>
          </label>

          <CleanButton className="doubt-btn">?</CleanButton>

        </ToDoItemWrap>
    )
}

export default ToDoItem;