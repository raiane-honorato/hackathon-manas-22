import { NavLink, useNavigate, useParams } from "react-router-dom";
import backButton from "./../../assets/back-btn.svg";
import { useEffect, useState } from "react";
import { CleanButton, PurpleButton, TransButton, WhiteButton } from "../../styles/button";
import { dictionary } from "../../assets/translate";
import Services from "../../services";
import SnackbarComp from "../../components/Snackbar";
import { AccordionWrapper, DeleteButton, PersonWrapper, SettingsWrapper } from "./styles";
import { FormControl, Input, InputLabel, TextField } from "@mui/material";
import {getAvatar} from "../../assets/getAvatar";


function Person() {
  const {listId, personId} = useParams();
  console.log(personId)
  let navigate = useNavigate();
  
  const [list, setList] = useState({});
  const [hasPerson, setHasPerson] = useState(false);
  const [person, setPerson] = useState({
    name: '',
    avatar: 0,
    stars: 0
  })

  useEffect(() => {
    Services.getListById(listId).then(
      res => setList(res.data)
    )
    
    if(personId){
      Services.getUserById(listId, personId).then(
        res => {
          console.log("res", res);
          setPerson(res.data);
          setHasPerson(true);
        }
      )
    }

  }, []);

  const [snackState, setSnackState] = useState({
    open: false,
    type: "success",
    duration: 1000,
    message: dictionary['label_success_add_task'],
    handleClose: (() => {
      setSnackState({...snackState, open: false});
      navigate(`/list/${listId}/settings`);
      }
      )
  });

  const editPerson = async () => {
    const res = await Services.updateUser(listId, personId, person.avatar, person.name, person.stars);
    if(res.status === 204) {
      setSnackState({...snackState, open: true, type: "success", message: dictionary['label_success_edit_person']});
    } else {
      setSnackState({...snackState, open: true, type: "error", message: dictionary['label_error']});
    }
  }

  const addPerson = async () => {
    if(!person.name || !person.avatar) {
      setSnackState({...snackState, open: true, type: "error", message: dictionary['label_person_error']});
      return;
    }
    const res = await Services.addUserToList(listId, person.avatar, person.name, person.stars);
    console.log(res)
    if(res.status === 201) {
      setSnackState({...snackState, open: true, type: "success", message: dictionary['label_success_add_person']});
    } else {
      setSnackState({...snackState, open: true, type: "error", message: dictionary['label_error']});
    }
  }

  const deletePerson = async () => {
    const res = await Services.deleteUser(listId, personId);
    if(res.status === 204) {
      setSnackState({...snackState, open: true, type: "success", message: dictionary['label_success_delete_person']});
    } else {
      setSnackState({...snackState, open: true, type: "error", message: dictionary['label_error']});
    }
  }

  return(
    <PersonWrapper>

      <SnackbarComp 
        open={snackState.open} 
        type={snackState.type} 
        duration={snackState.duration} 
        message={snackState.message} 
        handleClose={snackState.handleClose} 
      />

      <div className="go-back">
        <NavLink to={`/list/${listId}/settings`}><img src={backButton}/></NavLink>
        <span>{hasPerson ? dictionary['label_edit_person'] : dictionary['label_add_person']}</span>
      </div>

      <div className="person-fields">

        <div className="person-field-div">
          <span>{dictionary['label_person_name']}</span>
          <TextField
            labelId="task-form-id"
            value={person.name}
            label={dictionary['label_person_name']}
            onChange={(e) => {setPerson({...person, name:e.target.value})}}
            color="secondary"
          />
        </div>

        <div className="person-field-div">
          <span>{dictionary['label_avatar_definition']}</span>
          <ul className="avatar-fields">
            {[1,2,3,4,5,6,7,8].map(avId => 
              <li>
                <CleanButton onClick={() => setPerson({...person, avatar: avId})}>
                  <img 
                    className={`avatar-img ${person.avatar === avId ? "avatar-active" : ""}`} 
                    src={getAvatar(avId)} 
                    alt={`${dictionary['label_alt_avatar']}${avId}`}/>
                </CleanButton>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="person-buttons">
        <PurpleButton onClick={() => hasPerson ? editPerson() : addPerson()}>{hasPerson ? dictionary['label_edit_person'] : dictionary['label_add_person']}
        </PurpleButton>

        {
          hasPerson &&
          <TransButton onClick={deletePerson}>{dictionary['label_delete_person']}</TransButton>
        }
      </div>

    </PersonWrapper>
  )
}

export default Person;