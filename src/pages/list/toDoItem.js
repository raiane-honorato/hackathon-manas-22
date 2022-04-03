import { useEffect } from "react";
import { useState } from "react";
import Services from "../../services";
import { ToDoItemTutorialWrap, ToDoItemWrap } from "./styles";
import { CleanButton } from "../../styles/button";
import { getAvatar } from "../../utils/getAvatar";
import { Avatar, AvatarGroup, Checkbox } from "@mui/material";
import Tutorial from "../../components/tutorial";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { handleStar } from "../../utils/handleStar";

function ToDoItem({task, listId, setUpdateList, snackState, setSnackState}) {
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
      Promise.all(promises).then(values => {
          setUsers(values.reduce((accum, elem) => {
          elem.status === 200 && accum.push(elem.data);
          return accum;
        },[]))
        }
      );

      Services.getTaskTypeById(task.type_id).then(res => setType(res.data));
    },[])

    useEffect( () => {
      async function fetchData() {
        await Services.updateTask(
          listId, 
          task.id, 
          task.name, 
          task.renew_time, 
          done, 
          task.type_id, 
          task.responsable_list, 
          task.created_at,
          task?.last_renewed_date
          )
        
          setUpdateList(true);
      };
      fetchData();
    },[done])

    const handleDone = async () => {
      const starMessage = (
        <>
          <AvatarGroup max={2} sx={{display: 'inline'}}>
            {users && users.map(user => (
              <Avatar alt={user?.name} key={`avatar-key-${user?.id}`} src={getAvatar(user?.avatar)} sx={{ width: 30, height: 30 }}/>
            ))}
          </AvatarGroup>
          Usuários receberam uma estrela!
        </>
      )

      setDone(!done);
      if(!done) {
        const starRes = await handleStar(listId, task.responsable_list);
        if(starRes.status === 204) {
          setSnackState({...snackState, open: true, type: "success", message: starMessage})
        }
      }
    }


    return(
      <ToDoItemTutorialWrap done={done}>
        <ToDoItemWrap done={done} onClick={() => {navigate(`/list/${listId}/task/${task.id}`)}}>
          <div className="avatar-name-wrapp">
            <span>{task.name}</span>
            <div className="avatar-wrapp">
              <AvatarGroup max={2}>
                {users && users.map(user => (
                  <Avatar alt={user?.name} key={`avatar-key-${user?.id}`} src={getAvatar(user?.avatar)} sx={{ width: 30, height: 30 }}/>
                ))}
              </AvatarGroup>
            </div>
          </div>

          <Checkbox 
            checked={done}
            onChange={handleDone}
            onClick={(event) => {event.stopPropagation()}}
            color="default"
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28, backgroundColor: 'white'} }}
            className="task-checkbox"
          />

          <span>{formatDate(createdDate)}</span>
          
          {type?.tutorial &&
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
          <Tutorial tutorialLink={type?.tutorial} onClose={() => setTutorialOpen(!tutorialOpen)}/>
        }
      </ToDoItemTutorialWrap>
    )
}

export default ToDoItem;