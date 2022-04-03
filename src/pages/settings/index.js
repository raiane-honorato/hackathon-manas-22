import { NavLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import backButton from "./../../assets/back-btn.svg";
import expandButton from "./../../assets/expand_icon.svg";
import logoPeople from "./../../assets/team.svg";
import logoReward from "./../../assets/reward.svg";
import { useEffect, useState } from "react";
import { CleanButton } from "../../styles/button";
import { dictionary } from "../../utils/translate";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Services from "../../services";
import SnackbarComp from "../../components/Snackbar";
import { AccordionWrapper, DeleteButton, SettingsWrapper } from "./styles";
import PersonItem from "./personItem";
import Loading from "../../components/Loading";


function Settings() {
  const {listId} = useParams();
  let navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const onlyPeople = searchParams.get("people") === "true";
  let props = {};
  if(onlyPeople) {props = {expanded: true}};

  
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [list, setList] = useState({});

  useEffect(() => {
    setIsLoading(true);
    Services.getUsersList(listId).then(
      res => setUsers(res.data)
    )

    Services.getListById(listId).then(
      res => {
        setList(res.data);
        setIsLoading(false);
      }
    )
  }, []);

  const [snackState, setSnackState] = useState({
    open: false,
    type: "success",
    duration: 1000,
    message: dictionary['label_success_add_task'],
    handleClose: (() => {
      setSnackState({...snackState, open: false});
      }
      )
  });

  const handleRewardUpdate = async () => {
    setIsLoading(true);
    const response = await Services.updateList(listId, list.name, list.reward);
    setIsLoading(false);
    if(response.status === 204) {
      setSnackState({...snackState, open: true, type: "success", message: dictionary['label_success_reward']})
    } else {
      setSnackState({...snackState, open: false, type: "error", message: dictionary['label_error']})
    }
  }

  const handleDeleteList = async () => {
    setIsLoading(true);
    const response = await Services.deleteList(listId);
    setIsLoading(false);
    if(response.status === 204) {
      setSnackState({
        ...snackState, 
        open: true, 
        type: "success", 
        message: dictionary['label_success_delete_list'],
        handleClose: (() => {
          setSnackState({...snackState, open: false});
          navigate("/");
        })
      })
    } else {
      setSnackState({...snackState, open: false, type: "error", message: dictionary['label_error']})
    }
  }

  return(
    <SettingsWrapper>

      <SnackbarComp 
        open={snackState.open} 
        type={snackState.type} 
        duration={snackState.duration} 
        message={snackState.message} 
        handleClose={snackState.handleClose} 
      />

      <div className="go-back">
        <NavLink to={`/list/${listId}`}><img src={backButton} alt={dictionary['alt_back-btn']}/></NavLink>
        <span>{onlyPeople ? dictionary['label_people'] : dictionary['label_settings']}</span>
      </div>

      <AccordionWrapper>

        <div style={{width: '100%'}}>
          <Accordion {...props}>
            <AccordionSummary
              expandIcon={onlyPeople ? '': <img src={expandButton} alt={dictionary['alt_expand_btn']}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="settings-title-wrapp">
                <img src={logoPeople} alt={dictionary['alt_logo_people']}/>
                <span>{dictionary['label_people']}</span>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="person-wrapp">
                <span>{users?.length > 0 && dictionary['label_people_desc']}</span>
                {users && 
                users.map(user => (<PersonItem person={user} listId={listId} key={`person-item-${user.id}`}/>))
                }
                <CleanButton 
                  className="settings-btn-action"
                  onClick={() => navigate(`/list/${listId}/person`)}
                >{dictionary['label_add_person']}</CleanButton>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      {!onlyPeople && 
      <>
        <div style={{marginTop: '20px'}}>
        <Accordion>
          <AccordionSummary
          expandIcon={<img src={expandButton} alt={dictionary['alt_expand_btn']}/>}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <div className="settings-title-wrapp">
              <img src={logoReward} alt={dictionary['alt_logo_reward']}/>
              <span>{dictionary['label_reward']}</span>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="reward-wrapp">
              <span>{dictionary['label_reward_desc']}</span>

              <textarea 
                placeholder={dictionary['label_reward_placeholder']}
                value={list.reward}
                onChange={(e) => setList({...list, reward: e.target.value})}
              ></textarea>

              <CleanButton 
              className="settings-btn-action"
              onClick={handleRewardUpdate}
              >
                {dictionary['label_save_reward']}
              </CleanButton>
            </div>
          </AccordionDetails>
        </Accordion>
        </div>

        <DeleteButton onClick={handleDeleteList}>{dictionary['label_delete_list']}</DeleteButton>
      </>
      }

      </AccordionWrapper>
      <Loading open={isLoading} />
    </SettingsWrapper>
  )
}

export default Settings;