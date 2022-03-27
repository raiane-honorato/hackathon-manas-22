import { PopUpContainer } from "./styles";
import closeIcon from './../../assets/close_icon.svg';
import { NavLink } from "react-router-dom";
import { CleanButton, GreenButton } from "../../styles/button";
import { dictionary } from "../../assets/translate";
import { Input } from "../../styles/inputs";

function ListPopUp({hasList, linkText, setListOpen, setLinkText, listId}) {


    return(
    <PopUpContainer>
        <div className="close-btn-wrapper">
            <CleanButton onClick={() => setListOpen(false)}><img src={closeIcon} alt={dictionary['alt_close_btn']}/></CleanButton>
        </div>
        <h2>{!hasList ? dictionary['label_created_list'] : dictionary['label_access_link']}</h2>

        <div className="link-wrapper">
            <span>{dictionary['label_link']}</span>
            <div>
                {!hasList && 
                <>
                <Input type="text" value={linkText} readonly="readonly"/>
                <CleanButton>{dictionary['label_copy']}</CleanButton>
                </>
                }

                {hasList && <Input type="text" onChange={(e) => {setLinkText(e.target.value)}}/>}

                
            </div>
        </div>

        <GreenButton className="go-page-btn"><NavLink to={`list/${listId}`}>{dictionary['label_go_list']}</NavLink></GreenButton>

    </PopUpContainer>
    )
};

export default ListPopUp;