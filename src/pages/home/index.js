import { HomeContainer } from "./styles";
import logoPurple from "./../../assets/logo_purple.svg";
import logoWhite from "./../../assets/logo_white.svg";
import { dictionary } from "../../utils/translate";
import { Button, WhiteButton } from "../../styles/button";
import { useState } from "react";
import ListPopUp from "../../components/PopUp";
import createList from "../../services/services";
import Services from "../../services";
import { Backdrop, CircularProgress } from "@mui/material";
import Loading from "../../components/Loading";

function Home() {

  const [listOpen, setListOpen] = useState(false);
  const [listId, setListId] = useState('');
  const [listLink, setListLink] = useState('');
  const [hasList, setHasList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const createNewList = () => {
    setIsLoading(true);
    Services.createList("", "").then(
      res => {
        setListId(res.data);
        setListLink(`${window.location.origin}/list/${res.data}`);
        setIsLoading(false);
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
        <WhiteButton onClick = {() => {setHasList(true); setListOpen(true); setListLink('')}}> {dictionary['label_has_list']} </WhiteButton>
      </div>
    </HomeContainer>
    {listOpen && <ListPopUp linkText={listLink} setLinkText={setListLink} listId={listId} hasList={hasList} listOpen = {listOpen} setListOpen={setListOpen} setListId={setListId}/>}

    <Loading open={isLoading} />
    </>

  )
}

export default Home;