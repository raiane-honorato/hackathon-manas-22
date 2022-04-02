import { getAvatar } from "../../assets/getAvatar";
import { dictionary } from "../../assets/translate";
import { PersonItemWrapper } from "./styles";
import starIcon from "../../assets/star_icon.svg";

function PersonItem ({person}) {
  return (
    <PersonItemWrapper>
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