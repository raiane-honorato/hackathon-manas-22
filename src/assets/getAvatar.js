import avatar1 from "./avatar_1.png";
import avatar2 from "./avatar_2.png";
import avatar3 from "./avatar_3.png";
import avatar4 from "./avatar_4.png";
import avatar5 from "./avatar_5.png";
import avatar6 from "./avatar_6.png";

export const getAvatar = (avId) => {
  switch (avId){
    case 1: return(avatar1);
    case 2: return(avatar2);
    case 3: return(avatar3);
    case 4: return(avatar4);
    case 5: return(avatar5);
    case 6: return(avatar6);
  }
}