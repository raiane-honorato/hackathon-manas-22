import avatar1 from "./../assets/avatar_1.png";
import avatar2 from "./../assets/avatar_2.png";
import avatar3 from "./../assets/avatar_3.png";
import avatar4 from "./../assets/avatar_4.png";
import avatar5 from "./../assets/avatar_5.png";
import avatar6 from "./../assets/avatar_6.png";
import avatar7 from "./../assets/avatar_7.png";
import avatar8 from "./../assets/avatar_8.png";


export const getAvatar = (avId) => {
  switch (avId){
    case 1: return(avatar1);
    case 2: return(avatar2);
    case 3: return(avatar3);
    case 4: return(avatar4);
    case 5: return(avatar5);
    case 6: return(avatar6);
    case 7: return(avatar7);
    case 8: return(avatar8);
  }
}