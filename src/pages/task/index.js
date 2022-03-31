import { NavLink, useParams } from "react-router-dom";
import { TaskWrapper } from "./styles";
import backButton from "./../../assets/back-btn.svg";
import { useEffect, useState } from "react";
import { CleanButton, WhiteButton } from "../../styles/button";
import { dictionary } from "../../assets/translate";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Services from "../../services";
import Tutorial from "../../components/tutorial";
import { PurpleCheckbox } from "../../styles/checkbox";

function Task() {
  const {listId, taskId} = useParams();
  const [activeCategory, setActiveCategory] = useState('adult');
  const [users, setUsers] = useState([]);
  const [taskTypeList, setTaskTypeList] = useState([]);
  const [type, setType] = useState({});
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [responsable, setResponsable] = useState([]);
  const [recurrentTask, setRecurrentTask] = useState(false);
  const [recurrency, setRecurrency] = useState(0);

  useEffect(() => {
    console.log('users::::::',users,"task Type::::::", taskTypeList);
    console.log("responsable:::::", responsable)
  }, [users, taskTypeList, responsable])

  useEffect(() => {
    Services.getUsersList(listId).then(
      res => setUsers(res)
    )

    Services.getTaskTypeList(activeCategory).then(
      res => setTaskTypeList(res)
    )
  }, [activeCategory]); 

  const handleResponsableChange = (event) => {
    const value = event.target.value;
    console.log("value:::", typeof value === 'string')
    setResponsable(typeof value === 'string' ? value.split(',') : value );
  }

  return(
    <TaskWrapper>
      <div className="go-back-categories-wrapp">
        <NavLink to={`/list/${listId}`}><img src={backButton}/></NavLink>
        <span>{dictionary['label_add_task']}</span>
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
            value={type}
            label={dictionary['label_task']}
            onChange={(e) => setType(e.target.value)}
            color="secondary"
          >
            {taskTypeList && taskTypeList.map((taskType) => {
              return(<MenuItem value={taskType}>{taskType.label}</MenuItem>)
            }
            )}
          </Select>
        </FormControl>

        <CleanButton onClick={() => setTutorialOpen(!tutorialOpen)}>{dictionary['label_how_to_do_it']}</CleanButton>
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
            value={responsable}
            label={dictionary['label_responsable']}
            onChange={handleResponsableChange}
            color="secondary"
          >
            {users && users.map((user) => {
              return(<MenuItem key={user.name} value={user}>{user.name}</MenuItem>)
            }
            )}
          </Select>
        </FormControl>

        <NavLink to="/">{dictionary['label_add_responsable']}</NavLink>
      </div>

      <div className="recurrent-wrap">
        <PurpleCheckbox>
          <label className="checkbox-container">{dictionary['label_recurrent_task']}
            <input type="checkbox" checked={recurrentTask} onClick={() => setRecurrentTask(!recurrentTask)} ></input>
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
                value={recurrency}
                label={dictionary['label_recurrency']}
                onChange={(e) => setRecurrency(e.target.value)}
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

    </TaskWrapper>
  )
}

export default Task;