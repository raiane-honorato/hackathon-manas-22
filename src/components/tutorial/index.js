import { dictionary } from "../../utils/translate";
import { TutorialWrapper } from "./styles";

function Tutorial({tutorialLink}) {
  return(
    < TutorialWrapper >
    <div className="balloon-div"></div>
    <div>
      <span>{dictionary['label_tutorial']}</span>
    </div>
      <iframe 
        src = {tutorialLink}
        title = "YouTube video player"
        frameborder = "0"
        allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen > 
    </iframe> 
    </TutorialWrapper>
  )
}

export default Tutorial;