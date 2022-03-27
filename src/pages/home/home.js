import { HomeContainer } from "./styles";
import logoPurple from "./../../assets/logo_purple.svg";
import logoWhite from "./../../assets/logo_white.svg";
import { dictionary } from "../../assets/translate";
import { Button, WhiteButton } from "../../styles/button";
import { useState } from "react";
import ListPopUp from "../../components/PopUp/ListPopUp";
import createList from "./../../services/services";
import Services from "../../services";

function Home() {

  const [listOpen, setListOpen] = useState(false);
  const [listId, setListId] = useState('');
  const [listLink, setListLink] = useState('');
  const [hasList, setHasList] = useState(false);
  
  const createNewList = () => {
    Services.createList("Nome da lista", "").then(
      res => {
        setListId(res);
        setListLink(`${window.location.origin}/${res}`);
      });
    setListOpen(true);
  }

  return(
    <>
    <HomeContainer>
      <img src={logoWhite} alt={dictionary['alt_logo']}/>
      <p>{dictionary['text_home']}</p>
      <div className = "buttonWrap">
        <WhiteButton onClick = {() => {createNewList(); setHasList(false)}}> {dictionary['label_create_list']} </WhiteButton>
        <WhiteButton onClick = {() => {setHasList(true); setListOpen(true)}}> {dictionary['label_has_list']} </WhiteButton>
      </div>
    </HomeContainer>
    {listOpen && <ListPopUp linkText={listLink} setLinkText={setListLink} listId={listId} hasList={hasList} setListOpen={setListOpen} />}
    </>

  )
}

export default Home;