import { BrowserRouter, NavLink, useNavigate, useParams } from "react-router-dom";
import { TaskWrapper } from "./styles";
import backButton from "./../../assets/back-btn.svg";
import { useEffect, useState } from "react";
import { CleanButton, PurpleButton, TransButton, WhiteButton } from "../../styles/button";
import { dictionary } from "../../assets/translate";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Services from "../../services";
import Tutorial from "../../components/tutorial";
import { PurpleCheckbox } from "../../styles/checkbox";
import SnackbarComp from "../../components/Snackbar";

function Task() {
  const {listId, taskId} = useParams();
  let navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('adult');
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [recurrentTask, setRecurrentTask] = useState(false);


  const [users, setUsers] = useState([]);
  const [taskTypeList, setTaskTypeList] = useState([]);

  const [taskState, setTaskState] = useState({
    name: null,
    renew_time: 0,
    status: false,
    type_id: null,
    responsable_list: [],
    created_at: null
  });

  const [type, setType] = useState({});
  const [hasTask, setHasTask] = useState(false);
  const [snackState, setSnackState] = useState({
    open: false,
    type: "success",
    duration: 1000,
    message: dictionary['label_success_add_task'],
    handleClose: (() => {
      setSnackState({...snackState, open: false});
      navigate(`/list/${listId}`);
      }
      )
  });

  useEffect(() => {
    Services.getUsersList(listId).then(
      res => setUsers(res.data)
    )

    Services.getTaskTypeList(activeCategory).then(
      res => setTaskTypeList(res.data)
    )
  }, [activeCategory]);

  useEffect(async () => {
    if(taskId) {
      const res = await Services.getTaskById(listId, taskId);
      setTaskState(res.data);
      setHasTask(true);
      if(res.data.renew_time > 0) {
        setRecurrentTask(true);
      }
    }
  },[]);

  const handleResponsableChange = (event) => {
    let value = event.target.value;
    if(typeof value === 'string') {
      value = value.split(',');
    } 
    setTaskState({...taskState, responsable_list: value});
  };

  const handleTaskTypeChange = (event) => {
    let value = event.target.value;

    const selectedType = taskTypeList.filter(taskType => taskType.id == value)[0];
    setType(selectedType);
    setTaskState({...taskState, type_id: value, name: selectedType.label});
  };

  const addTask = async () => {
    const response = await Services.addTaskToList(listId, ...Object.values(taskState));
    console.log(response)
    if(response.status === 201) {
      setSnackState({...snackState, open: true, type: "success", message: dictionary['label_success_add_task']})
    } else {
      setSnackState({...snackState, open: false, type: "error", message: dictionary['label_error']})
    }
  };

  const editTask = async () => {
    const response = await Services.updateTask(
      listId, 
      taskId, 
      taskState.name, 
      taskState.renew_time, 
      taskState.status, 
      taskState.type_id, 
      taskState.responsable_list, 
      taskState.created_at
      );
      if(response.status === 204) {
        setSnackState({...snackState, open: true, type: "success", message: dictionary['label_success_edit_task']})
      } else {
        setSnackState({...snackState, open: false, type: "error", message: dictionary['label_error']})
      }
  };

  const deleteTask = async () => {
    const response = await Services.deleteTask(listId, taskId);
    if(response.status === 204) {
      setSnackState({...snackState, open: true, type: "success", message: dictionary['label_success_delete_task']})
    } else {
      setSnackState({...snackState, open: false, type: "error", message: dictionary['label_error']})
    }
  }

  return(
    <TaskWrapper>

      <SnackbarComp 
        open={snackState.open} 
        type={snackState.type} 
        duration={snackState.duration} 
        message={snackState.message} 
        handleClose={snackState.handleClose} 
      />

      <div className="go-back-categories-wrapp">
        <NavLink to={`/list/${listId}`}><img src={backButton}/></NavLink>
        <span>{hasTask ? dictionary['label_edit_task'] : dictionary['label_add_task']}</span>
        <div className="categories-wrapp">
          <WhiteButton 
          className={`category ${(activeCategory == 'adult') && 'cat-active'}`}
          onClick={() => setActiveCategory('adult')}
          >
            {dictionary['label_adult']}
          </WhiteButton> 

          <WhiteButton 
            className={`category ${(activeCategory == 'child') && 'cat-active'}`}
            onClick={() => setActiveCategory('child')}
          >
            {dictionary['label_child']}
          </WhiteButton> 
        </div>
      </div>

      <div className="form-wrapp">
        <FormControl sx={{ width: 220 }}>
          <InputLabel id="task-form-id">{dictionary['label_task']}</InputLabel>
          <Select
            labelId="task-form-id"
            value={taskState.type_id}
            label={dictionary['label_task']}
            onChange={handleTaskTypeChange}
            color="secondary"
          >
            {taskTypeList && taskTypeList.map((taskType) => {
              return(<MenuItem value={taskType.id}>{taskType.label}</MenuItem>)
            }
            )}
          </Select>
        </FormControl>

        <CleanButton onClick={() => setTutorialOpen(!tutorialOpen)}>
          {dictionary['label_how_to_do_it']}
        </CleanButton>
      </div>

      {tutorialOpen &&
        <Tutorial tutorialLink={type.tutorial} onClose={() => setTutorialOpen(!tutorialOpen)}/>
      }

      <div className="form-wrapp">
      <FormControl sx={{ width: 220 }}>
          <InputLabel id="responsable-form-id">{dictionary['label_responsable']}</InputLabel>
          <Select
            labelId="responsable-form-id"
            multiple
            value={taskState.responsable_list}
            label={dictionary['label_responsable']}
            onChange={handleResponsableChange}
            color="secondary"
          >
            {users && users.map((user) => {
              return(<MenuItem key={user.name} value={user.id}>{user.name}</MenuItem>)
            }
            )}
          </Select>
        </FormControl>

        <NavLink to={`/list/${listId}/settings`}>{dictionary['label_add_responsable']}</NavLink>
      </div>

      <div className="recurrent-wrap">
        <PurpleCheckbox>
          <label className="checkbox-container">{dictionary['label_recurrent_task']}
            <input type="checkbox" 
              checked={recurrentTask} 
              onClick={() => setRecurrentTask(!recurrentTask)} 
            ></input>
            <span class="checkmark"></span>
          </label>
        </PurpleCheckbox>

        {recurrentTask &&
          <div className="description-recurrent-wrap">
            <span className="desc-recurrent">{dictionary['label_desc_recurrent']}</span>
            <span className="question-recurrent">{dictionary['label_question_recurrent']}</span>
            <FormControl sx={{ width: 220, height: 30 }}>
              <InputLabel id="recurrency-form-id">{dictionary['label_recurrency']}</InputLabel>
              <Select
                labelId="recurrency-form-id"
                value={taskState.renew_time}
                label={dictionary['label_recurrency']}
                onChange={(e) => setTaskState({...taskState, renew_time: e.target.value})}
                color="secondary"
              >
                {[1,2,3,4,5,6,7].map((value) => {
                  return(<MenuItem value={value}>{value}</MenuItem>)
                }
                )}
              </Select>
            </FormControl>
          </div>
        }
      </div>

      <PurpleButton 
        className="add-task-btn" 
        onClick={() => {hasTask ? editTask() : addTask()}}
      >
        {hasTask ? dictionary['label_edit_task'] : dictionary['label_add_task']}
      </PurpleButton>

      {hasTask && 
        <TransButton className="delete-task-btn" onClick={deleteTask}>
          {dictionary['label_delete_task']}
        </TransButton>
      }

    </TaskWrapper>
  )
}

export default Task;