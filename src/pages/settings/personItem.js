import { getAvatar } from "../../utils/getAvatar";
import { dictionary } from "../../utils/translate";
import { PersonItemWrapper } from "./styles";
import starIcon from "../../assets/star_icon.svg";
import { useNavigate } from "react-router-dom";


function PersonItem ({person, listId}) {
  let navigate = useNavigate();

  return (
    <PersonItemWrapper onClick={() => {navigate(`/list/${listId}/person/${person.id}`)}}>
      <div>
        <img className="person-avatar" src={getAvatar(person.avatar)} alt={`${dictionary['label_alt_avatar']}${person.name}`}/>
        <span>{person.name}</span>
      </div>
      <div>
        <span>{person.stars}</span>
        <img src={starIcon} alt={dictionary['label_alt_star']}/>
      </div>
    </PersonItemWrapper>
  )
}

export default PersonItem;