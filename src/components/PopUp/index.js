import { PopUpContainer } from "./styles";
import closeIcon from './../../assets/close_icon.svg';
import { NavLink } from "react-router-dom";
import { CleanButton, GreenButton, WhiteButton } from "../../styles/button";
import { dictionary } from "../../utils/translate";
import { Input } from "../../styles/inputs";
import { useEffect, useState } from "react";
import { Modal, TextField } from "@mui/material";
import SnackbarComp from "./../Snackbar";

function ListPopUp({hasList, linkText, listOpen, setListOpen, setLinkText, listId, setListId}) {

    const [errorLink, setErrorLink] = useState(false);
    useEffect(() => {
        const hasList = linkText.indexOf('list/') >= 0;

        if(linkText) {
          if(hasList){ 
              setListId(linkText.slice(linkText.indexOf('list/') + ('list/').length));
              setErrorLink(false);
          } else {
              setErrorLink(true);
          }
        } else {
          setErrorLink(false);
        }

    }, [linkText, listId])

    const [snackState, setSnackState] = useState({
      open: false,
      type: "success",
      duration: 1000,
      message: dictionary['label_success_copy'],
      handleClose: (() => {
        setSnackState({...snackState, open: false});
        }
        )
    });

    const handleCopy = () => {
      navigator.clipboard.writeText(linkText);
      setSnackState({...snackState, open: true})
    };


    return(
    <Modal
      open={listOpen}
      onClose={() => setListOpen(false)}
      className="teste"
    >


      <PopUpContainer>
      <SnackbarComp
        open={snackState.open} 
        type={snackState.type} 
        duration={snackState.duration} 
        message={snackState.message} 
        handleClose={snackState.handleClose} 
      />
          <div className="close-btn-wrapper">
              <CleanButton onClick={() => setListOpen(false)}><img src={closeIcon} alt={dictionary['alt_close_btn']}/></CleanButton>
          </div>
          <h2>{!hasList ? dictionary['label_created_list'] : dictionary['label_access_link']}</h2>

          <div className="link-wrapper">

              <div>
                  <TextField 
                      error={errorLink}
                      value={linkText}
                      onChange={(e) => {setLinkText(e.target.value)}}
                      InputProps={{
                          readOnly: !hasList,
                      }}
                      label={dictionary['label_link']}
                      color="secondary"
                      helperText={errorLink && dictionary['label_invalid_link']}
                  />
              </div>
                  {!hasList && <WhiteButton onClick={handleCopy}>{dictionary['label_copy']}</WhiteButton>}
          </div>

          <GreenButton className="go-page-btn"><NavLink to={`list/${listId}`}>{dictionary['label_go_list']}</NavLink></GreenButton>

      </PopUpContainer>
    </Modal>
    )
};

export default ListPopUp;